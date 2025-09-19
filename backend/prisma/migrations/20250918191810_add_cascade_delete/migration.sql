-- DropForeignKey
ALTER TABLE "public"."AdmissionPlan" DROP CONSTRAINT "AdmissionPlan_specialtyId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Enrolled" DROP CONSTRAINT "Enrolled_specialtyId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Rating" DROP CONSTRAINT "Rating_specialtyId_fkey";

-- AddForeignKey
ALTER TABLE "public"."Enrolled" ADD CONSTRAINT "Enrolled_specialtyId_fkey" FOREIGN KEY ("specialtyId") REFERENCES "public"."Specialty"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Rating" ADD CONSTRAINT "Rating_specialtyId_fkey" FOREIGN KEY ("specialtyId") REFERENCES "public"."Specialty"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."AdmissionPlan" ADD CONSTRAINT "AdmissionPlan_specialtyId_fkey" FOREIGN KEY ("specialtyId") REFERENCES "public"."Specialty"("id") ON DELETE CASCADE ON UPDATE CASCADE;
