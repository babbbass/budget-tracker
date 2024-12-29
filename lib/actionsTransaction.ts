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

export async function deleteTransaction(transaction: {
  id: string
  budgetId: string
  amount: number
}) {
  try {
    await updateBudgetTransaction({
      budgetId: transaction.budgetId,
      amount: transaction.amount,
      operation: "increment",
    })

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
}: {
  budgetId: string
  amount: number
  name: string
}) {
  try {
    const budget = await updateBudgetTransaction({
      budgetId,
      amount,
      operation: "decrement",
    })

    if (!budget) {
      throw new Error("Budget non trouvé.")
    }

    const newTransaction = await prisma.transaction.create({
      data: {
        amount,
        name,
        budget: {
          connect: {
            id: budgetId,
          },
        },
      },
    })
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
  budgetId,
}: {
  id: string
  nameTransaction: string
  amount: number
  budgetId: string
}) {
  try {
    const transaction = await prisma.transaction.findUnique({
      where: {
        id,
      },
    })

    if (!transaction) {
      throw new Error("Transaction introuvable")
    }

    const addOrLess = transaction.amount - amount

    await updateBudgetTransaction({
      budgetId,
      amount: addOrLess,
      operation: addOrLess > 0 ? "increment" : "decrement",
    })

    const newTransaction = await prisma.transaction.update({
      where: {
        id,
      },
      data: {
        name: nameTransaction,
        amount,
        // budget: {
        //   connect: {
        //     id: budgetId,
        //   },
        // },
      },
    })
    return newTransaction
  } catch (error) {
    console.log(error)
    throw new Error("Transaction introuvable")
  }
}

async function updateBudgetTransaction({
  budgetId,
  amount,
  operation,
}: {
  budgetId: string
  amount: number
  operation: "increment" | "decrement"
}) {
  try {
    if (operation === "increment") {
      const budget = await prisma.budget.update({
        where: {
          id: budgetId,
        },
        data: {
          amount: {
            increment: amount,
          },
        },
      })
      return budget
    }

    const budget = await prisma.budget.update({
      where: {
        id: budgetId,
      },
      data: {
        amount: {
          decrement: amount,
        },
      },
    })
    return budget
  } catch (error) {
    console.log(error)
    throw new Error("Budget introuvable")
  }
}
