import * as repository from '../repositories/pagesRepository';
import { Page, NewPageData } from '../types/pageTypes';
import { User } from '../types/userTypes';

export async function getUserPages(user: User): Promise<Page[]> {
  return repository.getUserPages(user.id);
}

export async function getPageById(pageId: number): Promise<Page> {
  const page = await repository.getPageById(pageId);
  if (!page) throw { type: 'Not Found' };
  return page;
}

export async function insertPage(user: User, data: NewPageData): Promise<void> {
  const urlCheck = await repository.getPageByUrl(data.urlName, user.id);
  if (urlCheck) throw { type: 'Conflict', message: 'URL Name already in use' };
  return repository.insertPage(user.id, data.urlName);
}

export async function changePageTitle(user: User, pageId: number, newTitle: NewPageData): Promise<void> {
  const page = await repository.getPageById(pageId);
  if (!page) throw { type: 'Not Found' };
  if (page.userId !== user.id) throw { type: 'Unauthorized' };
  await repository.updatePage(pageId, newTitle);
}

export async function updatePage(
  user: User,
  pageId: number,
  data: Partial<Page>
): Promise<void> {
  const page = await repository.getPageById(pageId);
  if (!page) throw { type: 'Not Found' };
  if (page.userId !== user.id) throw { type: 'Unauthorized' };
  if (data.urlName) {
    const urlCheck = await repository.getPageByUrl(data.urlName, user.id);
    if (urlCheck) throw { type: 'Conflict', message: 'URL Name already in use' };
  }
  await repository.updatePage(pageId, data);
}

export async function deletePage(user: User, pageId: number): Promise<void> {
  const page = await repository.getPageById(pageId);
  if (!page) throw { type: 'Not Found' };
  if (page.userId !== user.id) throw { type: 'Unauthorized' };
  await repository.deletePage(pageId);
}