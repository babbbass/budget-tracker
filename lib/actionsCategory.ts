"use server"
import { prisma } from "./db"

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
    })
    return category
  } catch (error) {
    console.error("Erreur lors de l'ajout du budget:", error)
    throw error
  }
}
