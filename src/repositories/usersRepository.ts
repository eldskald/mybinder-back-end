import db from '../database';
import { User, SignUpData } from '../types/userTypes';

export async function findUserById(id: number): Promise<User | null> {
  return await db.user.findUnique({
    where: { id }
  });
}

export async function findUserByUsername(username: string): Promise<User | null> {
  return await db.user.findUnique({
    where: { username }
  });
}

export async function insertUser(data: SignUpData): Promise<void> {
  await db.user.create({ data });
}

export async function updateDisplayname(id: number, newName: string): Promise<void> {
  await db.user.update({
    data: { displayname: newName },
    where: { id }
  });
}