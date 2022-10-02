import bcrypt from 'bcrypt';
import { findUserByUsername, insertUser, updateDisplayname } from '../repositories/usersRepository';
import { User, SignUpData } from '../types/userTypes';

export async function signUpUser(data: SignUpData): Promise<void> {
  const checkUsername: User | null = await findUserByUsername(data.username);
  if (checkUsername) throw { type: 'Conflict', message: 'Username unavailable' };
  const passwordHash: string = await bcrypt.hash(data.password, 10);
  const insertData: SignUpData = { ...data, password: passwordHash };
  await insertUser(insertData);
}

export async function changeDisplayname(id: number, newName: string): Promise<void> {
  await updateDisplayname(id, newName);
}