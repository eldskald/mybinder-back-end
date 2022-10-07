import * as service from '../services/usersService';
import sendResponse from '../utils/sendResponse';
import { Request, Response } from 'express';

export async function signUp(req: Request, res: Response) {
  await service.signUp(req.body);
  return sendResponse({ type: 'Created' }, res);
}

export async function updateUser(req: Request, res: Response) {
  await service.updateUser(req.body, res.locals.user);
  return sendResponse({ type: 'Updated' }, res);
}