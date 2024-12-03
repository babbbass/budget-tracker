import React from "react"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { findAllBudgetByUser } from "@/lib/actionsBudget"
import { BudgetsTable } from "@/components/BudgetsTable"
import { AddBudgetDialog } from "@/components/addBudgetDialog"

export default async function BudgetPage() {
  const user = await currentUser()
  if (!user) {
    redirect("/connexion")
  }
  const email = user?.emailAddresses[0].emailAddress
  const budgets = await findAllBudgetByUser(email)

  return (
    <>
      <AddBudgetDialog email={email} />
      {budgets && budgets.categories.length > 0 && (
        //@ts-expect-error "resolve later"
        <BudgetsTable categoriesData={budgets.categories} />
      )}
    </>
  )
}
