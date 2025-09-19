/*
  Warnings:

  - You are about to drop the `Enrolled` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Rating` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Enrolled" DROP CONSTRAINT "Enrolled_specialtyId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Rating" DROP CONSTRAINT "Rating_specialtyId_fkey";

-- DropTable
DROP TABLE "public"."Enrolled";

-- DropTable
DROP TABLE "public"."Rating";

-- CreateTable
CREATE TABLE "public"."Abiturient" (
    "id" SERIAL NOT NULL,
    "full_name" TEXT NOT NULL,
    "specialtyId" INTEGER NOT NULL,
    "score" INTEGER,
    "isEnrolled" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Abiturient_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Abiturient" ADD CONSTRAINT "Abiturient_specialtyId_fkey" FOREIGN KEY ("specialtyId") REFERENCES "public"."Specialty"("id") ON DELETE CASCADE ON UPDATE CASCADE;
