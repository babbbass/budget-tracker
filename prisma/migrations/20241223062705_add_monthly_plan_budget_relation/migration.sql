/*
  Warnings:

  - You are about to drop the column `monthlyPlanId` on the `Budget` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Budget" DROP CONSTRAINT "Budget_monthlyPlanId_fkey";

-- AlterTable
ALTER TABLE "Budget" DROP COLUMN "monthlyPlanId";

-- CreateTable
CREATE TABLE "MonthlyPlanBudget" (
    "id" TEXT NOT NULL,
    "monthlyPlanId" TEXT NOT NULL,
    "budgetId" TEXT NOT NULL,

    CONSTRAINT "MonthlyPlanBudget_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MonthlyPlanBudget_monthlyPlanId_budgetId_key" ON "MonthlyPlanBudget"("monthlyPlanId", "budgetId");

-- AddForeignKey
ALTER TABLE "MonthlyPlanBudget" ADD CONSTRAINT "MonthlyPlanBudget_monthlyPlanId_fkey" FOREIGN KEY ("monthlyPlanId") REFERENCES "MonthlyPlan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MonthlyPlanBudget" ADD CONSTRAINT "MonthlyPlanBudget_budgetId_fkey" FOREIGN KEY ("budgetId") REFERENCES "Budget"("id") ON DELETE CASCADE ON UPDATE CASCADE;
