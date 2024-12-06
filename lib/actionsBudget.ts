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
  console.log(startDate, endDate, typeof startDate, typeof endDate)
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

    const createdBudget = await prisma.budget.create({
      data: {
        name: budgetName,
        amount,
        categoryId: category.id,
        startDate: formattedStartDate ? new Date(formattedStartDate) : "",
        endDate: formattedEndDate ? new Date(formattedEndDate) : "",
      },
    })

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

export async function deleteBudget(budgetId: string) {
  try {
    await prisma.budget.delete({
      where: {
        id: budgetId,
      },
    })
  } catch (error) {
    console.error("Erreur lors de la suppression du budget:", error)
    throw error
  }
}
