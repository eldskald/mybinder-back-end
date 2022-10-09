import * as service from '../services/entriesService';
import sendResponse from '../utils/sendResponse';
import { Request, Response } from 'express';

export async function getEntries(req: Request, res: Response) {
  const { username, pagename } = req.params;
  await service.getPageEntries(pagename, username)
  return sendResponse({ type: 'Ok' }, res);
}

export async function postEntry(req: Request, res: Response) {
  const pageId = parseInt(req.params.pageId);
  if (!pageId) throw { type: 'Not Found' };
  await service.insertEntry(res.locals.user, pageId);
  return sendResponse({ type: 'Created' }, res);
}

export async function putEntry(req: Request, res: Response) {
  const pageId = parseInt(req.params.pageId);
  if (!pageId) throw { type: 'Not Found' };
  const entryId = parseInt(req.params.entryId);
  if (!entryId) throw { type: 'Not Found' };
  await service.updateEntry(res.locals.user, pageId, entryId, req.body);
  return sendResponse({ type: 'Updated' }, res);
}

export async function moveUpEntry(req: Request, res: Response) {
  const pageId = parseInt(req.params.pageId);
  if (!pageId) throw { type: 'Not Found' };
  const entryId = parseInt(req.params.entryId);
  if (!entryId) throw { type: 'Not Found' };
  await service.moveUpEntry(res.locals.user, pageId, entryId);
  return sendResponse({ type: 'Updated' }, res);
}

export async function moveDownEntry(req: Request, res: Response) {
  const pageId = parseInt(req.params.pageId);
  if (!pageId) throw { type: 'Not Found' };
  const entryId = parseInt(req.params.entryId);
  if (!entryId) throw { type: 'Not Found' };
  await service.moveDownEntry(res.locals.user, pageId, entryId);
  return sendResponse({ type: 'Updated' }, res);
}