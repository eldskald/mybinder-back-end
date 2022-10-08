-- CreateEnum
CREATE TYPE "EntryType" AS ENUM ('TITLE', 'BANNER', 'IMAGE', 'THUMBNAIL', 'TEXT', 'SPACE');

-- CreateTable
CREATE TABLE "pages" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "entries" (
    "id" SERIAL NOT NULL,
    "pageId" INTEGER NOT NULL,
    "index" INTEGER NOT NULL,
    "type" "EntryType" NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "text" TEXT,
    "imageUrl" TEXT,
    "sourceUrl" TEXT,
    "space" INTEGER,

    CONSTRAINT "entries_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "pages_userId_title_key" ON "pages"("userId", "title");

-- CreateIndex
CREATE UNIQUE INDEX "entries_index_key" ON "entries"("index");

-- AddForeignKey
ALTER TABLE "pages" ADD CONSTRAINT "pages_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "entries" ADD CONSTRAINT "entries_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "pages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
