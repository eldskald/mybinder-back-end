/*
  Warnings:

  - Made the column `title` on table `entries` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `entries` required. This step will fail if there are existing NULL values in that column.
  - Made the column `text` on table `entries` required. This step will fail if there are existing NULL values in that column.
  - Made the column `imageUrl` on table `entries` required. This step will fail if there are existing NULL values in that column.
  - Made the column `sourceUrl` on table `entries` required. This step will fail if there are existing NULL values in that column.
  - Made the column `space` on table `entries` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "entries" ALTER COLUMN "title" SET NOT NULL,
ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "text" SET NOT NULL,
ALTER COLUMN "imageUrl" SET NOT NULL,
ALTER COLUMN "sourceUrl" SET NOT NULL,
ALTER COLUMN "space" SET NOT NULL;
