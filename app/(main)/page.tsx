import React from "react"
import { auth, currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { Dashboard } from "@/components/dashboard/Dashboard"
import { findAllBudgetByUser } from "@/lib/actionsBudget"

export default async function Home() {
  const { userId } = await auth()
  const user = await currentUser()

  if (!userId || !user) {
    redirect("/connexion")
  }

  const fullName = user.firstName + " " + user.lastName
  const email = user.emailAddresses[0].emailAddress

  const budgets = await findAllBudgetByUser(email)
  const userBudgets = budgets?.categories.filter((category) => {
    return category.budgets.length > 0
  })

  if (userBudgets?.length === 0) {
    redirect("/dashboard/settings")
  }

  return <Dashboard userId={userId} fullName={fullName} email={email} />
}
