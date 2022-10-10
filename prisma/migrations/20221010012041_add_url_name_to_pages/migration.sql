/*
  Warnings:

  - The values [banner] on the enum `EntryType` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `urlName` to the `pages` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "EntryType_new" AS ENUM ('title', 'image', 'thumbnail', 'text', 'space');
ALTER TABLE "entries" ALTER COLUMN "type" TYPE "EntryType_new" USING ("type"::text::"EntryType_new");
ALTER TYPE "EntryType" RENAME TO "EntryType_old";
ALTER TYPE "EntryType_new" RENAME TO "EntryType";
DROP TYPE "EntryType_old";
COMMIT;

-- AlterTable
ALTER TABLE "pages" ADD COLUMN     "urlName" VARCHAR(50) NOT NULL;
