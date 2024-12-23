"use server"

import { prisma } from "./db"
import { redirect } from "next/navigation"
import { auth } from "@clerk/nextjs/server"

export async function addUserToDB(
  clerkUserId: string,
  name: string,
  email: string
) {
  try {
    const user = await prisma.user.upsert({
      where: { clerkUserId },
      update: { name, email },
      create: {
        clerkUserId,
        name,
        email,
      },
    })
    return user
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function getUserFromDB() {
  const { userId } = await auth()
  try {
    if (!userId) {
      redirect("/")
    }
    const user = await prisma.user.findUnique({
      where: { clerkUserId: userId },
    })

    return user
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function getUserByEmail(email: string) {
  const user = await prisma.user.findUnique({
    where: { email },
  })
  if (!user) {
    throw new Error("Utilisateur non trouvé")
  }

  return user
}
