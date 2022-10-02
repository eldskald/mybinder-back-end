import { signUpUser, changeDisplayname } from '../services/usersService';
import sendResponse from '../utils/sendResponse';
import { Request, Response } from 'express';

export async function signUp(req: Request, res: Response) {
  await signUpUser(req.body);
  return sendResponse({ type: 'Created' }, res);
}

export async function updateDisplayname(req: Request, res: Response) {
  changeDisplayname(res.locals.user.id, req.body.newName);
  return sendResponse({ type: 'Ok' }, res);
}