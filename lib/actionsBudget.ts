"use server"
import { prisma } from "./db"

export async function addBudget(
  email: string,
  categoryName: string,
  subCategoryName: string,
  amount: number
  // selectedEmoji: string
) {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      throw new Error("Utilisateur non trouvé")
    }

    const category = await prisma.category.create({
      data: {
        name: categoryName,
        userId: user.id,
      },
    })

    await prisma.subCategory.create({
      data: {
        name: subCategoryName,
        amount,
        // emoji: selectedEmoji,
        categoryId: category.id,
      },
    })
  } catch (error) {
    console.error("Erreur lors de l'ajout du budget:", error)
    throw error
  }
}

export async function findAllBudget(email: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        categories: {
          include: {
            subCategories: true,
          },
        },
      },
    })
    return user
  } catch (error) {
    console.error("Erreur lors de la recherche des budgets:", error)
    throw error
  }
}

export async function addTransactionToBudget(
  budgetId: number,
  amount: number,
  description: string
) {
  try {
    const budget = await prisma.subCategory.findUnique({
      where: {
        id: budgetId,
      },
      include: {
        transactions: true,
      },
    })

    if (!budget) {
      throw new Error("Budget non trouvé.")
    }

    // const totalTransactions = budget.transactions.reduce((sum, transaction) => {
    //   return sum + transaction.amount
    // }, 0)

    // const totalWithNewTransaction = totalTransactions + amount

    // if (totalWithNewTransaction > budget.amount) {
    //   throw new Error(
    //     "Le montant total des transactions dépasse le montant du budget."
    //   )
    // }

    const newTransaction = await prisma.transaction.create({
      data: {
        amount,
        description,
        // emoji: budget.emoji,
        subCategory: {
          connect: {
            id: budget.id,
          },
        },
      },
    })
    console.log(newTransaction)
    return newTransaction
  } catch (error) {
    console.error("Erreur lors de l'ajout de la transaction:", error)
    throw error
  }
}

export async function getBudget(budgetId: number) {
  try {
    const budget = await prisma.subCategory.findUnique({
      where: {
        id: budgetId,
      },
      include: {
        transactions: true,
      },
    })
    return budget
  } catch (error) {
    console.error("Erreur lors de la recherche du budget:", error)
    throw error
  }
}

export async function deleteBudget(budgetId: number) {
  try {
    await prisma.subCategory.delete({
      where: {
        id: budgetId,
      },
    })
  } catch (error) {
    console.error("Erreur lors de la suppression du budget:", error)
    throw error
  }
}
