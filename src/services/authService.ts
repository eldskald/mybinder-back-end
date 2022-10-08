import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { findUserById, findUserByUsername } from '../repositories/usersRepository';
import { User, SignInData } from '../types/userTypes';

const SECRET = process.env.JWT_SECRET as string;

export function generateToken(userId: number): string {
  return jwt.sign(
    { userId },
    SECRET,
    { expiresIn: 60 * 60 * 24 * 30 }
  );
}

export async function validateToken(token: string): Promise<User> {
  try {
    const payload: any = jwt.verify(token, SECRET);
    const user: User | null = await findUserById(payload.userId);
    if (!user) throw { type: 'Unauthorized' };
    return user;
  } catch (err) {
    throw { type: 'Unauthorized' };
  }
}

export async function validateCredentials(data: SignInData): Promise<User> {
  const user: User | null = await findUserByUsername(data.username);
  if (!user) throw { type: 'Unauthorized' };
  const passwordCheck: boolean = await bcrypt.compare(data.password, user.password);
  if (!passwordCheck) throw { type: 'Unauthorized' };
  return user;
}
