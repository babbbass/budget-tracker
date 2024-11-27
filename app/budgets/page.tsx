import React from "react"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { findAllBudget } from "@/lib/actionsBudget"
import { BudgetsTable } from "@/components/BudgetsTable"
import { AddBudgetDialog } from "@/components/addBudgetDialog"

export default async function BudgetPage() {
  const user = await currentUser()
  if (!user) {
    redirect("/connexion")
  }
  const email = user?.emailAddresses[0].emailAddress
  const budgets = await findAllBudget(email)

  return (
    <>
      <AddBudgetDialog email={email} />
      {budgets && budgets.categories.length > 0 && (
        <BudgetsTable categoriesData={budgets.categories} />
      )}
    </>
  )
}
