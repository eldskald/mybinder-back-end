import { validateCredentials, generateToken } from '../services/authService';
import sendResponse from '../utils/sendResponse';
import { Request, Response } from 'express';
import { User } from '../types/userTypes';

export async function signIn(req: Request, res: Response) {
  const user: User = await validateCredentials(req.body);
  const token: string = generateToken(user.id);
  return sendResponse({
    type: 'Ok',
    message: {
      userId: user.id,
      username: user.username,
      displayname: user.displayname,
      token
    }
  }, res);
}

export async function signInFromToken(req: Request, res: Response) {
  const user: User = res.locals.user;
  return sendResponse({
    type: 'Ok',
    message: {
      userId: user.id,
      username: user.username,
      displayname: user.displayname,
    }
  }, res);
}