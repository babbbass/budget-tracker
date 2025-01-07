/*
  Warnings:

  - You are about to drop the column `description` on the `Transaction` table. All the data in the column will be lost.
  - Added the required column `type` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CategoryType" AS ENUM ('REVENUS', 'DETTES', 'EPARGNES', 'INVESTISSEMENTS', 'DEPENSES_FIXES', 'DEPENSES_VARIABLES');

-- AlterTable
ALTER TABLE "Budget" ADD COLUMN     "startAmount" DOUBLE PRECISION DEFAULT 0.0;

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "type" "CategoryType" NOT NULL;

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "description",
ADD COLUMN     "name" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "MonthlyPlan" (
    "id" TEXT NOT NULL,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MonthlyPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MonthlyPlanBudget" (
    "id" TEXT NOT NULL,
    "monthlyPlanId" TEXT NOT NULL,
    "budgetId" TEXT NOT NULL,

    CONSTRAINT "MonthlyPlanBudget_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlanCategory" (
    "id" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "categoryId" TEXT NOT NULL,
    "monthlyPlanId" TEXT NOT NULL,

    CONSTRAINT "PlanCategory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MonthlyPlan_month_year_userId_key" ON "MonthlyPlan"("month", "year", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "MonthlyPlanBudget_monthlyPlanId_budgetId_key" ON "MonthlyPlanBudget"("monthlyPlanId", "budgetId");

-- CreateIndex
CREATE UNIQUE INDEX "PlanCategory_categoryId_monthlyPlanId_key" ON "PlanCategory"("categoryId", "monthlyPlanId");

-- AddForeignKey
ALTER TABLE "MonthlyPlan" ADD CONSTRAINT "MonthlyPlan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MonthlyPlanBudget" ADD CONSTRAINT "MonthlyPlanBudget_monthlyPlanId_fkey" FOREIGN KEY ("monthlyPlanId") REFERENCES "MonthlyPlan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MonthlyPlanBudget" ADD CONSTRAINT "MonthlyPlanBudget_budgetId_fkey" FOREIGN KEY ("budgetId") REFERENCES "Budget"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanCategory" ADD CONSTRAINT "PlanCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanCategory" ADD CONSTRAINT "PlanCategory_monthlyPlanId_fkey" FOREIGN KEY ("monthlyPlanId") REFERENCES "MonthlyPlan"("id") ON DELETE CASCADE ON UPDATE CASCADE;
