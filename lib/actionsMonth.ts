"use server"
import { prisma } from "./db"
import { MonthsEnum } from "@/types"
import { getUserByEmail } from "@/lib/actionsUser"

export async function findMonthPlanByEmail(email: string, month: string) {
  try {
    const user = await getUserByEmail(email)
    const monthPlan = await prisma.monthlyPlan.findFirst({
      where: {
        month: Object.keys(MonthsEnum)
          .filter((key) => isNaN(Number(key)))
          .indexOf(month.toUpperCase()),
        year: 2025,
        userId: user.id,
      },
    })
    if (!monthPlan) {
      return []
    }
    const monthlyBudgets = await prisma.budget.findMany({
      where: {
        monthlyPlanId: monthPlan?.id,
      },
      include: {
        category: true,
        transactions: true,
      },
    })
    return monthlyBudgets
  } catch (error) {
    console.error("Erreur lors de la recherche du budget:", error)
    throw error
  }
}
