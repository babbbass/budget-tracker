"use server"
import { prisma } from "./db"
import { MonthsEnum } from "@/types"
import { getUserByEmail } from "@/lib/actionsUser"

export async function findMonthPlanById(email: string, month: string) {
  try {
    const user = await getUserByEmail(email)
    const monthPlan = await prisma.monthlyPlan.findFirst({
      where: {
        month:
          MonthsEnum[String(month).toUpperCase() as keyof typeof MonthsEnum],
        year: 2025,
        userId: user.id,
      },
    })
    return monthPlan
  } catch (error) {
    console.error("Erreur lors de la recherche du budget:", error)
    throw error
  }
}
