/*
  Warnings:

  - The values [TITLE,BANNER,IMAGE,THUMBNAIL,TEXT,SPACE] on the enum `EntryType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "EntryType_new" AS ENUM ('title', 'banner', 'image', 'thumbnail', 'text', 'space');
ALTER TABLE "entries" ALTER COLUMN "type" TYPE "EntryType_new" USING ("type"::text::"EntryType_new");
ALTER TYPE "EntryType" RENAME TO "EntryType_old";
ALTER TYPE "EntryType_new" RENAME TO "EntryType";
DROP TYPE "EntryType_old";
COMMIT;
