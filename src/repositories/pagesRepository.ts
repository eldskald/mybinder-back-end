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

export async function getPageByTitle(title: string, userId: number): Promise<FullPage | null> {
  return await db.page.findUnique({
    where: { userId_title: { userId, title} },
    include: { entries: true }
  });
}

export async function insertPage(userId: number, title: string): Promise<void> {
  await db.page.create({
    data: { userId, title }
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