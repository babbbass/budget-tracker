"use server"
import { prisma } from "./db"
import { CategoriesEnum } from "@/types"

export async function getAllCategoriesByUser(email: string) {
  try {
    let category = null
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      throw new Error("Utilisateur non trouvé")
    }
    category = await prisma.category.findMany({
      where: {
        userId: user.id,
      },
      include: {
        budgets: {
          where: {
            monthlyPlanId: null,
          },
          select: {
            id: true,
            name: true,
            amount: true,
            monthlyPlans: true,
          },
        },
      },
    })

    if (category.length === 0) {
      category = await createInitialCategory(email)
    }
    return category
  } catch (error) {
    console.error("Erreur lors de l'ajout du budget:", error)
    throw error
  }
}

export async function fetchCategoryById(categoryId: string) {
  try {
    const category = await prisma.category.findUnique({
      where: {
        id: categoryId,
      },
      select: {
        name: true,
        budgets: {
          where: {
            monthlyPlanId: null,
          },
          select: {
            id: true,
            name: true,
            amount: true,
            transactions: {
              select: {
                id: true,
              },
            },
          },
        },
      },
    })
    return category
  } catch (error) {
    console.error("Erreur lors de la recherche de la catégorie:", error)
    throw error
  }
}

export async function createInitialCategory(email: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    })
    if (!user) {
      throw new Error("Utilisateur non trouvé")
    }
    const categories = await Promise.all(
      ["Revenus", "Depenses fixes", "Depenses variables"].map((name) =>
        prisma.category.create({
          data: {
            name,
            type: name
              .toUpperCase()
              .replace(/\s/g, "_") as keyof typeof CategoriesEnum,
            user: {
              connect: {
                id: user.id,
              },
            },
          },
        })
      )
    )

    return categories
  } catch (error) {
    console.error("Erreur lors de la creation des catégories initiales:", error)
    throw error
  }
}
