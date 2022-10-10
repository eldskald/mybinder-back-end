/*
  Warnings:

  - A unique constraint covering the columns `[userId,urlName]` on the table `pages` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "pages_userId_title_key";

-- CreateIndex
CREATE UNIQUE INDEX "pages_userId_urlName_key" ON "pages"("userId", "urlName");
