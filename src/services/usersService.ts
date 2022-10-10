import bcrypt from 'bcrypt';
import * as repository from '../repositories/usersRepository';
import { User, SignUpData, UpdateUserData } from '../types/userTypes';

export async function signUp(data: SignUpData): Promise<void> {
  const checkUsername: User | null = await repository.findUserByUsername(data.username);
  if (checkUsername) throw { type: 'Conflict', message: 'Username unavailable' };
  const passwordHash: string = await bcrypt.hash(data.password, 10);
  const insertData: SignUpData = { ...data, password: passwordHash };
  await repository.insertUser(insertData);
}

export async function updateUser(data: UpdateUserData, user: User): Promise<void> {
  if (!data.displayname && !data.newPassword) throw { type: 'Unprocessable', message: 'Must update something' };
  const entries: [string, string][] = [];
  if (data.newPassword) {
    if (!data.oldPassword) throw { type: 'Unauthorized', message: 'Must match old password correctly to update it' };
    const passwordCheck: boolean = await bcrypt.compare(data.oldPassword, user.password);
    if (!passwordCheck) throw { type: 'Unauthorized', message: 'Must match old password correctly to update it' };
    const passwordHash: string = await bcrypt.hash(data.newPassword, 10);
    entries.push(['password', passwordHash]);
  }
  if (data.displayname) {
    entries.push(['displayname', data.displayname]);
  }
  const newData = Object.fromEntries(entries);
  await repository.updateUser(user.id, newData);
}