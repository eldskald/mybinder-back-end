import pkg from '@prisma/client';

export type Page = pkg.Page
export type FullPage = Page & { entries: pkg.Entry[] };
export type PageTitle = { title: string };