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
            subCategories: {
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
    console.log(user.categories[0].subCategories)
    return
    const transactions = user.categories.flatMap((budjet) =>
      budjet.subCategories.map((transaction) => ({
        ...transaction,
        budgetName: budjet.name,
        budgetId: budjet.id,
      }))
    )
    console.log("action", transactions)
    return transactions
  } catch (error) {
    console.error("Erreur lors de la récupération des transactions:", error)
    throw error
  }
}
