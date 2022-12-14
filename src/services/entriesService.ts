import * as repository from '../repositories/entriesRepository';
import { getPageByUrl, getPageById } from '../repositories/pagesRepository';
import { findUserByUsername } from '../repositories/usersRepository'
import { FullPage } from '../types/pageTypes';
import { Entry, EntryData } from '../types/entryTypes';
import { User } from '../types/userTypes';

export async function getPageEntries(pagename: string, username: string): Promise<FullPage> {
  const user = await findUserByUsername(username);
  if (!user) throw { type: 'Not Found' };
  const page = await getPageByUrl(pagename, user.id);
  if (!page) throw { type: 'Not Found' };
  return page;
}

export async function insertEntry(user: User, pageId: number): Promise<void> {
  const page = await getPageById(pageId);
  if (!page) throw { type: 'Not Found' };
  if (page.userId !== user.id) throw { type: 'Unauthorized' };
  const data: Omit<Entry, 'id'> = {
    pageId: page.id,
    type: 'title',
    index: page.entries.length,
    title: '',
    description: '',
    imageUrl: '',
    text: '',
    sourceUrl: '',
    space: 0
  };
  await repository.createEntry(data);
}

export async function updateEntry(
  user: User,
  pageId: number,
  entryId: number,
  data: Partial<EntryData>
): Promise<void> {
  const page = await getPageById(pageId);
  if (!page) throw { type: 'Not Found', message: 'Page not found' };
  if (page.userId !== user.id) throw { type: 'Unauthorized' };
  const entry = await repository.getEntryById(entryId);
  if (!entry) throw { type: 'Not Found', message: 'Entry not found' };
  if (entry.pageId !== page.id) throw { type: 'Unauthorized' };
  const newData: EntryData = { ...entry, ...data };
  await repository.updateEntry(entryId, newData);
}

export async function deleteEntry(
  user: User,
  pageId: number,
  entryId: number,
): Promise<void> {
  const page = await getPageById(pageId);
  if (!page) throw { type: 'Not Found', message: 'Page not found' };
  if (page.userId !== user.id) throw { type: 'Unauthorized' };
  const entry = await repository.getEntryById(entryId);
  if (!entry) throw { type: 'Not Found', message: 'Entry not found' };
  if (entry.pageId !== page.id) throw { type: 'Unauthorized' };
  const entryIndex: number = entry.index;
  await repository.deleteEntry(entryId);
  for (const element of page.entries) {
    if (element.index > entryIndex) repository.moveUpEntry(element.id);
  }
}

export async function moveUpEntry(
  user: User,
  pageId: number,
  entryId: number
): Promise<void> {
  const page = await getPageById(pageId);
  if (!page) throw { type: 'Not Found', message: 'Page not found' };
  if (page.userId !== user.id) throw { type: 'Unauthorized' };
  const entry = await repository.getEntryById(entryId);
  if (!entry) throw { type: 'Not Found', message: 'Entry not found' };
  if (entry.pageId !== page.id) throw { type: 'Unauthorized' };
  if (entry.index === 0) throw { type: 'Not Allowed', message: 'Already at the top' };
  const entryIndex = entry.index;
  await repository.moveUpEntry(entryId);
  await repository.moveDownEntry(page.entries[entryIndex - 1].id);
}

export async function moveDownEntry(
  user: User,
  pageId: number,
  entryId: number
): Promise<void> {
  const page = await getPageById(pageId);
  if (!page) throw { type: 'Not Found', message: 'Page not found' };
  if (page.userId !== user.id) throw { type: 'Unauthorized' };
  const entry = await repository.getEntryById(entryId);
  if (!entry) throw { type: 'Not Found', message: 'Entry not found' };
  if (entry.pageId !== page.id) throw { type: 'Unauthorized' };
  if (entry.index === page.entries.length - 1) throw { type: 'Not Allowed', message: 'Already at the bottom' };
  const entryIndex = entry.index;
  await repository.moveDownEntry(entryId);
  await repository.moveUpEntry(page.entries[entryIndex + 1].id);
}