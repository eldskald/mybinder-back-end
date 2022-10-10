import db from '../database';
import { Page, FullPage } from '../types/pageTypes';

export async function getUserPages(userId: number): Promise<Page[]> {
  return await db.page.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' }
  });
}

export async function getPageById(pageId: number): Promise<FullPage | null> {
  return await db.page.findUnique({
    where: { id: pageId },
    include: { entries: true }
  });
}

export async function getPageByUrl(urlName: string, userId: number): Promise<FullPage | null> {
  return await db.page.findUnique({
    where: { userId_urlName: { userId, urlName } },
    include: { entries: true }
  });
}

export async function insertPage(userId: number, urlName: string): Promise<void> {
  await db.page.create({
    data: { userId, urlName, title: '' }
  });
}

export async function updatePage(pageId: number, data: Partial<Page>): Promise<void> {
  await db.page.update({
    data,
    where: { id: pageId }
  });
}

export async function deletePage(pageId: number): Promise<void> {
  await db.page.delete({
    where: { id: pageId }
  });
}