import * as repository from '../repositories/pagesRepository';
import { Page, PageTitle } from '../types/pageTypes';
import { User } from '../types/userTypes';

export async function getUserPages(user: User): Promise<Page[]> {
  return repository.getUserPages(user.id);
}

export async function getPageById(pageId: number): Promise<Page> {
  const page = await repository.getPageById(pageId);
  if (!page) throw { type: 'Not Found' };
  return page;
}

export async function insertPage(user: User, data: PageTitle): Promise<void> {
  return repository.insertPage(user.id, data.title);
}

export async function changePageTitle(user: User, pageId: number, newTitle: PageTitle): Promise<void> {
  const page = await repository.getPageById(pageId);
  if (!page) throw { type: 'Not Found' };
  if (page.userId !== user.id) throw { type: 'Unauthorized' };
  await repository.updatePage(pageId, newTitle);
}

export async function deletePage(user: User, pageId: number): Promise<void> {
  const page = await repository.getPageById(pageId);
  if (!page) throw { type: 'Not Found' };
  if (page.userId !== user.id) throw { type: 'Unauthorized' };
  await repository.deletePage(pageId);
}