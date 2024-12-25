/*
  Warnings:

  - A unique constraint covering the columns `[name,categoryId,monthlyPlanId]` on the table `Budget` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Budget_name_categoryId_key";

-- AlterTable
ALTER TABLE "Budget" ADD COLUMN     "monthlyPlanId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Budget_name_categoryId_monthlyPlanId_key" ON "Budget"("name", "categoryId", "monthlyPlanId");
