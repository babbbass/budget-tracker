import { prisma } from "@/lib/db"

export const getUserData = async (userId: string) => {
  const [categories, budgets, transactions, monthlyPlans] = await Promise.all([
    prisma.category.findMany({ where: { userId } }),
    prisma.budget.findMany({
      where: { category: { userId } },
      include: { category: true },
    }),
    prisma.transaction.findMany({
      where: { budget: { category: { userId } } },
      include: { budget: { include: { category: true } } },
    }),
    prisma.monthlyPlan.findMany({
      where: { userId },
      include: { categories: true, budgets: true },
    }),
  ])
  return { categories, budgets, transactions, monthlyPlans }
}
