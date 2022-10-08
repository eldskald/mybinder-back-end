import * as services from '../services/pagesService';
import sendResponse from '../utils/sendResponse';
import { Request, Response } from 'express';

export async function getUserPages(_req: Request, res: Response) {
  const pages = await services.getUserPages(res.locals.user);
  return sendResponse({ type: 'Ok', message: pages }, res);
}

export async function getPage(req: Request, res: Response) {
  const pageId = parseInt(req.params.pageId);
  if (!pageId) throw { type: 'Not Found' };
  const page = await services.getPageById(pageId);
  return sendResponse({ type: 'Ok', message: page }, res);
}

export async function postPage(req: Request, res: Response) {
  await services.insertPage(res.locals.user, req.body)
  return sendResponse({ type: 'Created' }, res);
}

export async function changePageTitle(req: Request, res: Response) {
  const pageId = parseInt(req.params.pageId);
  if (!pageId) throw { type: 'Not Found' };
  await services.changePageTitle(res.locals.user, pageId, req.body);
  return sendResponse({ type: 'Ok' }, res);
}

export async function deletePage(req: Request, res: Response) {
  const pageId = parseInt(req.params.pageId);
  if (!pageId) throw { type: 'Not Found' };
  await services.deletePage(res.locals.user, pageId);
  return sendResponse({ type: 'Deleted' }, res);
}