"use server"
import { prisma } from "./db"
import { cache } from "react"
import { MonthsEnum } from "@/types"
import { getUserByEmail } from "@/lib/actionsUser"
import { revalidatePath } from "next/cache"
import { CategoriesEnum } from "@/types"

type AddBudgetType = {
  id?: string
  email: string
  categoryName: string
  budgetName: string
  amount: number
  startDate?: Date
  endDate?: Date
}

type AddBudgetForMonthType = {
  email: string
  budget: {
    id: string
    name: string
    amount: number
  }
  month: string
  pathToRevalidate: string
}

export async function addBudgetForSetting({
  email,
  categoryName,
  budgetName,
  amount,
  startDate,
  endDate,
}: AddBudgetType) {
  const formattedStartDate = startDate
    ? startDate.toISOString().split("T")[0]
    : null
  const formattedEndDate = endDate ? endDate.toISOString().split("T")[0] : null

  try {
    let category = null

    const typeOfCategory = categoryName.toUpperCase().replace(/\s/g, "_")
    const user = await getUserByEmail(email)

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
          type: typeOfCategory as keyof typeof CategoriesEnum,
          userId: user.id,
        },
      })
    }

    const budget = await prisma.budget.findFirst({
      where: {
        name: budgetName,
        categoryId: category.id,
        monthlyPlanId: null,
      },
    })
    if (budget) {
      return budget
    }
    const createdBudget = await prisma.budget.create({
      data: {
        name: budgetName,
        amount,
        categoryId: category.id,
        startDate: formattedStartDate
          ? new Date(formattedStartDate)
          : undefined,
        endDate: formattedEndDate ? new Date(formattedEndDate) : undefined,
      },
    })

    return createdBudget
  } catch (error) {
    console.error("Erreur lors de l'ajout du budget:", error)
    throw error
  }
}

export const findMainBudgetByUserEmail = cache(async (email: string) => {
  try {
    const userBudgets = await prisma.user.findUnique({
      where: { email },
      include: {
        categories: {
          include: {
            budgets: {
              where: {
                monthlyPlanId: null,
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

export const findAllBudgetByUser = cache(async (email: string) => {
  try {
    const userBudgets = await prisma.user.findUnique({
      where: { email },
      include: {
        categories: {
          include: {
            budgets: {
              include: {
                monthlyPlans: true,
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

export async function findBudgetsForMonth(email: string, month: string) {
  try {
    const monthDb = await prisma.monthlyPlan.findFirst({
      where: {
        month: Object.keys(MonthsEnum)
          .filter((key) => isNaN(Number(key)))
          .indexOf(month.toUpperCase()),
        year: 2025,
      },
    })

    const budgets = await prisma.budget.findMany({
      where: {
        category: {
          user: {
            email,
          },
        },
        AND: [
          { monthlyPlanId: null },
          {
            monthlyPlans: monthDb
              ? {
                  none: {
                    monthlyPlanId: monthDb.id,
                  },
                }
              : {},
          },
        ],
      },
      include: {
        monthlyPlans: true,
        category: true,
      },
    })
    return budgets
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
        transactions: {
          select: {
            id: true,
            amount: true,
            createdAt: true,
            name: true,
          },
        },
        category: {
          select: {
            id: true,
            name: true,
          },
        },
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
  budget,
  month,
  pathToRevalidate,
}: AddBudgetForMonthType) {
  try {
    const monthNumber =
      MonthsEnum[month.toUpperCase() as keyof typeof MonthsEnum]

    let monthlyPlan = null
    const user = await getUserByEmail(email)

    monthlyPlan = await prisma.monthlyPlan.findFirst({
      where: {
        month: monthNumber,
        year: 2025,
        userId: user.id,
      },
    })
    if (!monthlyPlan) {
      monthlyPlan = await prisma.monthlyPlan.create({
        data: {
          month: monthNumber,
          year: 2025,
          userId: user.id,
        },
      })
    }

    const budgetDb = await prisma.budget.findFirst({
      where: {
        id: budget.id,
      },
    })

    if (!budgetDb) {
      throw new Error("Budget non trouvé.")
    }

    const budgetForMonth = await prisma.budget.create({
      data: {
        ...budgetDb,
        id: undefined,
        monthlyPlanId: monthlyPlan.id,
      },
    })

    await prisma.monthlyPlanBudget.create({
      data: {
        monthlyPlanId: monthlyPlan.id,
        budgetId: budgetForMonth.id,
      },
    })

    await prisma.monthlyPlanBudget.create({
      data: {
        monthlyPlanId: monthlyPlan.id,
        budgetId: budget.id,
      },
    })
    revalidatePath(pathToRevalidate)
    return true
  } catch (error) {
    console.error("Erreur lors de l'ajout du budget du mois:", error)
    throw error
  }
}

export async function removeBudgetForMonth({
  budgetId,
  budgetName,
  monthlyPlanId,
  pathToRevalidate,
}: {
  budgetId: string
  budgetName: string
  monthlyPlanId: string
  pathToRevalidate: string
}) {
  // console.log("action", budgetId, monthlyPlanId)
  try {
    await prisma.monthlyPlanBudget.deleteMany({
      where: {
        budgetId: budgetId,
        monthlyPlanId,
      },
    })
    // console.log("deletedBudget", deletedBudget)
    // const budgetsToDelete = await prisma.budget.findMany({
    //   where: {
    //     monthlyPlans: {
    //       some: {
    //         monthlyPlanId,
    //       },
    //     },
    //   },
    // })
    const parentBudget = await prisma.budget.findFirst({
      where: {
        name: budgetName,
        monthlyPlanId: null,
      },
    })
    //console.log("budgetsToDelete", budgetsToDelete)
    // return
    await prisma.monthlyPlanBudget.deleteMany({
      where: {
        budgetId: parentBudget?.id,
        monthlyPlanId,
      },
    })

    await prisma.budget.deleteMany({
      where: {
        id: budgetId,
      },
    })
    revalidatePath(pathToRevalidate)
    return true
  } catch (error) {
    console.error("Erreur lors de suppression budget du mois:", error)
    throw error
  }
}

export async function deleteBudgetAction(budget: {
  id: string
  name: string
  amount: number
  monthlyPlans: {
    id: string
    budgetId: string
    monthlyPlanId: string
  }[]
}) {
  try {
    await deleteBudgetSettings(budget)
    return { success: true }
  } catch (error) {
    console.error("Erreur dans deleteBudgetAction :", error)
    throw new Error("Échec de la suppression du budget.")
  }
}

async function deleteBudgetSettings(budget: {
  id: string
  name: string
  amount: number
  monthlyPlans: {
    id: string
    budgetId: string
    monthlyPlanId: string
  }[]
}) {
  const deletedBudget = await prisma.$transaction(async (prisma) => {
    // Delete the main budget
    await prisma.budget.delete({
      where: { id: budget.id },
    })

    // Delete associated monthly plans
    await prisma.monthlyPlan.deleteMany({
      where: {
        id: {
          in: budget.monthlyPlans.map((plan) => plan.monthlyPlanId),
        },
      },
    })
  })

  console.log("deletedBudget", deletedBudget)

  return { success: true }
}

export async function updateBudgetAction(budget: {
  id: string
  name: string
  amount: number
}) {
  try {
    await prisma.budget.update({
      where: {
        id: budget.id,
      },
      data: {
        name: budget.name,
        amount: budget.amount,
      },
    })
    return { success: true }
  } catch (error) {
    console.error("Erreur dans updateBudgetAction :", error)
    throw new Error("Échec de la modification du budget.")
  }
}
