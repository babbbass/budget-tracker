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
