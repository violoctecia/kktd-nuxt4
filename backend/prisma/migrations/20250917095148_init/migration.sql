/*
  Warnings:

  - You are about to drop the column `img` on the `About` table. All the data in the column will be lost.
  - You are about to drop the column `text` on the `About` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `About` table. All the data in the column will be lost.
  - Added the required column `content` to the `About` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."About" DROP COLUMN "img",
DROP COLUMN "text",
DROP COLUMN "title",
ADD COLUMN     "content" TEXT NOT NULL;
