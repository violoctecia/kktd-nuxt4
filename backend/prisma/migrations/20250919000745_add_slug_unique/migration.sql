/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `News` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `News` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "News_title_key" ON "public"."News"("title");

-- CreateIndex
CREATE UNIQUE INDEX "News_slug_key" ON "public"."News"("slug");
