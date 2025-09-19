/*
  Warnings:

  - You are about to drop the column `accreditation` on the `AdmissionPlan` table. All the data in the column will be lost.
  - You are about to drop the column `budget_places` on the `AdmissionPlan` table. All the data in the column will be lost.
  - You are about to drop the column `cost` on the `AdmissionPlan` table. All the data in the column will be lost.
  - You are about to drop the column `duration` on the `AdmissionPlan` table. All the data in the column will be lost.
  - You are about to drop the column `form` on the `AdmissionPlan` table. All the data in the column will be lost.
  - You are about to drop the column `paid_places` on the `AdmissionPlan` table. All the data in the column will be lost.
  - You are about to drop the column `qualification` on the `AdmissionPlan` table. All the data in the column will be lost.
  - You are about to drop the column `specialty` on the `AdmissionPlan` table. All the data in the column will be lost.
  - You are about to drop the column `group_name` on the `Enrolled` table. All the data in the column will be lost.
  - You are about to drop the column `specialty` on the `Enrolled` table. All the data in the column will be lost.
  - You are about to drop the column `specialty` on the `Rating` table. All the data in the column will be lost.
  - Added the required column `funding` to the `AdmissionPlan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `places` to the `AdmissionPlan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `specialtyId` to the `AdmissionPlan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `AdmissionPlan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `specialtyId` to the `Enrolled` table without a default value. This is not possible if the table is not empty.
  - Added the required column `specialtyId` to the `Rating` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."Funding" AS ENUM ('BUDGET', 'PAID');

-- AlterTable
ALTER TABLE "public"."AdmissionPlan" DROP COLUMN "accreditation",
DROP COLUMN "budget_places",
DROP COLUMN "cost",
DROP COLUMN "duration",
DROP COLUMN "form",
DROP COLUMN "paid_places",
DROP COLUMN "qualification",
DROP COLUMN "specialty",
ADD COLUMN     "funding" "public"."Funding" NOT NULL,
ADD COLUMN     "places" INTEGER NOT NULL,
ADD COLUMN     "price" INTEGER,
ADD COLUMN     "specialtyId" INTEGER NOT NULL,
ADD COLUMN     "year" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."Enrolled" DROP COLUMN "group_name",
DROP COLUMN "specialty",
ADD COLUMN     "specialtyId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."Rating" DROP COLUMN "specialty",
ADD COLUMN     "specialtyId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "public"."Specialty" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "qualification" TEXT NOT NULL,
    "durationMonths" INTEGER NOT NULL,
    "base" INTEGER NOT NULL,
    "form" TEXT NOT NULL,

    CONSTRAINT "Specialty_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Enrolled" ADD CONSTRAINT "Enrolled_specialtyId_fkey" FOREIGN KEY ("specialtyId") REFERENCES "public"."Specialty"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Rating" ADD CONSTRAINT "Rating_specialtyId_fkey" FOREIGN KEY ("specialtyId") REFERENCES "public"."Specialty"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."AdmissionPlan" ADD CONSTRAINT "AdmissionPlan_specialtyId_fkey" FOREIGN KEY ("specialtyId") REFERENCES "public"."Specialty"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
