/*
  Warnings:

  - You are about to drop the column `tags` on the `BlogPost` table. All the data in the column will be lost.
  - You are about to drop the column `thumbnail` on the `BlogPost` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `githubUrl` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `liveDemoUrl` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `technologies` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `thumbnail` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the `PersonalImage` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `imageId` to the `BlogPost` table without a default value. This is not possible if the table is not empty.
  - Added the required column `content` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageId` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PersonalImage" DROP CONSTRAINT "PersonalImage_userId_fkey";

-- AlterTable
ALTER TABLE "BlogPost" DROP COLUMN "tags",
DROP COLUMN "thumbnail",
ADD COLUMN     "imageId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "description",
DROP COLUMN "githubUrl",
DROP COLUMN "liveDemoUrl",
DROP COLUMN "technologies",
DROP COLUMN "thumbnail",
ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "imageId" TEXT NOT NULL;

-- DropTable
DROP TABLE "PersonalImage";

-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "tags" TEXT[],
    "width" INTEGER,
    "height" INTEGER,
    "blurDataUrl" TEXT,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Technology" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Technology_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProjectToTechnology" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ProjectToTechnology_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_BlogPostToTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_BlogPostToTag_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Technology_name_key" ON "Technology"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Technology_slug_key" ON "Technology"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_slug_key" ON "Tag"("slug");

-- CreateIndex
CREATE INDEX "_ProjectToTechnology_B_index" ON "_ProjectToTechnology"("B");

-- CreateIndex
CREATE INDEX "_BlogPostToTag_B_index" ON "_BlogPostToTag"("B");

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlogPost" ADD CONSTRAINT "BlogPost_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectToTechnology" ADD CONSTRAINT "_ProjectToTechnology_A_fkey" FOREIGN KEY ("A") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectToTechnology" ADD CONSTRAINT "_ProjectToTechnology_B_fkey" FOREIGN KEY ("B") REFERENCES "Technology"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BlogPostToTag" ADD CONSTRAINT "_BlogPostToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "BlogPost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BlogPostToTag" ADD CONSTRAINT "_BlogPostToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
