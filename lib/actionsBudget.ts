"use server"
import { prisma } from "./db"

export async function addBudget(
  email: string,
  categoryName: string,
  budgetName: string,
  amount: number,
  startDate?: Date,
  endDate?: Date
) {
  const formattedStartDate = startDate
    ? startDate.toISOString().split("T")[0]
    : null
  const formattedEndDate = endDate ? endDate.toISOString().split("T")[0] : null

  try {
    let category = null
    const user = await prisma.user.findUnique({
      where: { email },
    })
    if (!user) {
      throw new Error("Utilisateur non trouvé")
    }

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
      },
    })
    console.log("created budget", createdBudget)
    return createdBudget
  } catch (error) {
    console.error("Erreur lors de l'ajout du budget:", error)
    throw error
  }
}

export async function findAllBudgetByUser(email: string) {
  try {
    const userBudgets = await prisma.user.findUnique({
      where: { email },
      include: {
        categories: {
          include: {
            budgets: true,
          },
        },
      },
    })
    return userBudgets
  } catch (error) {
    console.error("Erreur lors de la recherche des budgets:", error)
    throw error
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
