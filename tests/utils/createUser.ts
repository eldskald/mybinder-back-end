import db from '../../src/database';
import bcrypt from 'bcrypt';
import { SignUpData } from '../../src/types/userTypes';

async function createUser(data: SignUpData): Promise<void> {
  const hash: string = await bcrypt.hash(data.password, 10);
  await db.user.create({ data: { ...data, password: hash } });
}

export default createUser;