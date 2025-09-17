-- CreateTable
CREATE TABLE "public"."About" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "img" TEXT,

    CONSTRAINT "About_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."News" (
    "id" SERIAL NOT NULL,
    "img" TEXT NOT NULL,
    "alt" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "iso_date" TEXT NOT NULL,
    "categories" TEXT[],
    "content" TEXT NOT NULL,

    CONSTRAINT "News_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Faq" (
    "id" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,

    CONSTRAINT "Faq_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Enrolled" (
    "id" SERIAL NOT NULL,
    "full_name" TEXT NOT NULL,
    "specialty" TEXT NOT NULL,
    "group_name" TEXT NOT NULL,

    CONSTRAINT "Enrolled_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Rating" (
    "id" SERIAL NOT NULL,
    "full_name" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "specialty" TEXT NOT NULL,

    CONSTRAINT "Rating_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."AdmissionPlan" (
    "id" SERIAL NOT NULL,
    "specialty" TEXT NOT NULL,
    "qualification" TEXT NOT NULL,
    "form" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "budget_places" INTEGER NOT NULL,
    "paid_places" INTEGER NOT NULL,
    "cost" INTEGER NOT NULL,
    "accreditation" BOOLEAN NOT NULL,

    CONSTRAINT "AdmissionPlan_pkey" PRIMARY KEY ("id")
);
