"use server"
import { prisma } from "./db"
import { cache } from "react"
import { MonthsEnum } from "@/types"
import { revalidatePath } from "next/cache"

type AddBudgetType = {
  email: string
  categoryName: string
  budgetName: string
  amount: number
  startDate?: Date
  endDate?: Date
  monthlyPlanId?: string
}

type AddBudgetForMonthType = {
  email: string
  categoryName: string
  budget: {
    id: string
    name: string
    amount: number
  }
  amount: number
  month: string
}

async function getUserEmail(email: string) {
  const user = await prisma.user.findUnique({
    where: { email },
  })
  if (!user) {
    throw new Error("Utilisateur non trouvé")
  }

  return user
}

export async function addBudget({
  email,
  categoryName,
  budgetName,
  amount,
  startDate,
  endDate,
  monthlyPlanId,
}: AddBudgetType) {
  const formattedStartDate = startDate
    ? startDate.toISOString().split("T")[0]
    : null
  const formattedEndDate = endDate ? endDate.toISOString().split("T")[0] : null

  try {
    let category = null

    const user = await getUserEmail(email)

    category = await prisma.category.findUnique({
      where: {
        name_userId: {
          name: categoryName,
          userId: user.id,
        },
      },
    })
    if (!category) {
      category = await prisma.category.create({
        data: {
          name: categoryName,
          type: "DEPENSES_VARIABLES",
          userId: user.id,
        },
      })
    }

    console.log("add budget", user, category)
    const createdBudget = await prisma.budget.create({
      data: {
        name: budgetName,
        amount,
        categoryId: category.id,
        startDate: formattedStartDate
          ? new Date(formattedStartDate)
          : undefined,
        endDate: formattedEndDate ? new Date(formattedEndDate) : undefined,
        monthlyPlanId,
      },
    })
    console.log("created budget", createdBudget)

    return createdBudget
  } catch (error) {
    console.error("Erreur lors de l'ajout du budget:", error)
    throw error
  }
}

export const findAllBudgetByUser = cache(async (email: string) => {
  try {
    const userBudgets = await prisma.user.findUnique({
      where: { email },
      include: {
        categories: {
          include: {
            budgets: {
              include: {
                monthlyPlan: true,
              },
            },
          },
        },
      },
    })
    return userBudgets
  } catch (error) {
    console.error("Erreur lors de la recherche des budgets:", error)
    throw error
  }
})

export async function findBudgetsForMonth(
  email: string,
  month: string,
  year: number
) {
  try {
    const userBudgets = await prisma.user.findUnique({
      where: { email },
      include: {
        categories: {
          include: {
            budgets: {
              include: {
                monthlyPlan: {
                  where: {
                    //month,
                    year,
                  },
                  select: {
                    month: true,
                    year: true,
                  },
                },
              },
            },
          },
        },
      },
    })
    return userBudgets
  } catch (error) {
    console.error("Erreur lors de la recherche des budgets:", error)
  }
}

export async function getBudgetsByCategory(
  email: string,
  categoryName: string
) {
  try {
    const budgets = await prisma.user.findUnique({
      where: { email },
      include: {
        categories: {
          where: {
            name: categoryName,
          },
          include: {
            budgets: {
              select: {
                id: true,
                name: true,
                amount: true,
                startDate: true,
                endDate: true,
                transactions: {
                  select: {
                    amount: true,
                  },
                },
              },
            },
          },
        },
      },
    })
    return budgets
  } catch (error) {
    console.error("Erreur lors de la recherche des budgets:", error)
    throw error
  }
}

export async function getBudgetById(budgetId: string) {
  try {
    const budget = await prisma.budget.findUnique({
      where: {
        id: budgetId,
      },
      include: {
        transactions: true,
        category: true,
      },
    })
    return budget
  } catch (error) {
    console.error("Erreur lors de la recherche du budget:", error)
    throw error
  }
}

export async function deleteBudgetById(budgetId: string): Promise<boolean> {
  console.log("action", budgetId)
  if (!budgetId) {
    throw new Error("Budget ID manquant.")
  }
  try {
    const deletedBudget = await prisma.budget.delete({
      where: {
        id: budgetId,
      },
    })

    return !!deletedBudget
  } catch (error) {
    console.error("Erreur lors de la suppression du budget:", error)
    throw error
  }
}

export async function addBudgetForMonth({
  email,
  categoryName,
  budget,
  amount,
  month,
}: AddBudgetForMonthType) {
  try {
    const monthNumber =
      MonthsEnum[month.toUpperCase() as keyof typeof MonthsEnum]
    //console.log("month", monthNumber)
    //return
    let budgetForMonth = null
    const user = await getUserEmail(email)

    budgetForMonth = await prisma.monthlyPlan.findFirst({
      where: {
        month: monthNumber,
        year: 2025,
        userId: user.id,
      },
    })
    if (!budgetForMonth) {
      budgetForMonth = await prisma.monthlyPlan.create({
        data: {
          month: monthNumber,
          year: 2025,
          userId: user.id,
        },
      })
    }
    let updateOrCreateBudget = await findBudgetById(budget.id)
    if (updateOrCreateBudget) {
      updateOrCreateBudget = await prisma.budget.update({
        where: {
          id: budget.id,
        },
        data: {
          amount,
          monthlyPlanId: budgetForMonth.id,
        },
      })
    } else {
      updateOrCreateBudget = await addBudget({
        email,
        categoryName,
        budgetName: budget.name,
        amount,
        //startDate,
        //endDate,
        monthlyPlanId: budgetForMonth.id,
      })
    }

    return budget
  } catch (error) {
    console.error("Erreur lors de l'ajout du budget:", error)
    throw error
  }
}

async function findBudgetById(budgetId: string) {
  try {
    const budget = await prisma.budget.findFirst({
      where: {
        id: budgetId,
      },
    })
    return budget
  } catch (error) {
    console.error("Erreur lors de la recherche des budgets:", error)
    throw error
  }
}

export async function deleteBudgetAction(
  budgetId: string,
  pathToRevalidate: string
) {
  try {
    await deleteBudgetById(budgetId)
    revalidatePath(pathToRevalidate)
    return { success: true }
  } catch (error) {
    console.error("Erreur dans deleteBudgetAction :", error)
    throw new Error("Échec de la suppression du budget.")
  }
}
