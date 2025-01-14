"use server"

import { prisma } from "./db"

export async function getTransactionsByUser(email: string, period: string) {
  try {
    const now = new Date()
    let dateLimit

    switch (period) {
      case "last30":
        dateLimit = new Date(now)
        dateLimit.setDate(now.getDate() - 30)
        break
      case "last90":
        dateLimit = new Date(now)
        dateLimit.setDate(now.getDate() - 90)
        break
      case "last7":
        dateLimit = new Date(now)
        dateLimit.setDate(now.getDate() - 7)
        break
      case "last365":
        dateLimit = new Date(now)
        dateLimit.setFullYear(now.getFullYear() - 1)
        break
      default:
        throw new Error("Période invalide.")
    }

    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        categories: {
          include: {
            budgets: {
              include: {
                transactions: true,
              },
            },
            // {
            //   where: {
            //     createdAt: {
            //       gte: dateLimit,
            //     },
            //   },
            //   orderBy: {
            //     createdAt: "desc",
            //   },
            // },
          },
        },
      },
    })

    if (!user) {
      throw new Error("Utilisateur non trouvé.")
    }
    // return
    const transactions = user.categories.flatMap((budjet) =>
      budjet.budgets.map((transaction) => ({
        ...transaction,
        budgetName: budjet.name,
        budgetId: budjet.id,
      }))
    )
    return transactions
  } catch (error) {
    console.error("Erreur lors de la récupération des transactions:", error)
    throw error
  }
}

export async function deleteTransaction(transaction: { id: string }) {
  try {
    await prisma.transaction.delete({
      where: {
        id: transaction.id,
      },
    })
    return true
  } catch (error) {
    console.error("Erreur lors de la suppression de la transaction:", error)
    throw error
  }
}

export async function addTransactionToBudget({
  budgetId,
  amount,
  name,
  modeTransaction,
}: {
  budgetId: string
  amount: number
  name: string
  modeTransaction: "ADD" | "REMOVE"
}) {
  try {
    const newTransaction = await prisma.transaction.create({
      data: {
        amount,
        name,
        type: modeTransaction,
        budget: {
          connect: {
            id: budgetId,
          },
        },
      },
    })

    if (modeTransaction === "ADD") {
      await prisma.budget.update({
        where: { id: budgetId },
        data: {
          amount: {
            increment: amount,
          },
        },
      })
    }
    return newTransaction
  } catch (error) {
    console.error("Erreur lors de l'ajout de la transaction:", error)
    throw error
  }
}

export async function findTransactionById(id: string) {
  try {
    const transaction = await prisma.transaction.findUnique({
      where: {
        id,
      },
      include: {
        budget: true,
      },
    })

    return transaction
  } catch (error) {
    console.log(error)
    throw new Error("Transaction introuvable")
  }
}

export async function updateTransaction({
  id,
  nameTransaction,
  amount,
}: {
  id: string
  nameTransaction: string
  amount: number
}) {
  try {
    const transaction = await prisma.transaction.update({
      where: {
        id,
      },
      data: {
        name: nameTransaction,
        amount,
      },
    })
    return transaction
  } catch (error) {
    console.log(error)
    throw new Error("Transaction introuvable")
  }
}
