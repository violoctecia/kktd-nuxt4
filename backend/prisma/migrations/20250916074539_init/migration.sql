/*
  Warnings:

  - You are about to drop the column `answer` on the `Faq` table. All the data in the column will be lost.
  - Added the required column `content` to the `Faq` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Faq" DROP COLUMN "answer",
ADD COLUMN     "content" TEXT NOT NULL;
