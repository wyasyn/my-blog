/*
  Warnings:

  - Added the required column `description` to the `BlogPost` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BlogPost" ADD COLUMN     "description" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "description" TEXT NOT NULL;
