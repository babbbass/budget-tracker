import React from "react"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { findAllBudgetByUser } from "@/lib/actionsBudget"
import { AddBudgetDialog } from "@/components/dialog/addBudgetDialog"
import { MonthSelector } from "@/components/MonthSelector"

export default async function BudgetPage() {
  const user = await currentUser()
  if (!user) {
    redirect("/connexion")
  }
  const email = user?.emailAddresses[0].emailAddress
  const budgets = await findAllBudgetByUser(email)

  return (
    <div className='flex flex-1 flex-col w-full md:w-1/2 gap-10'>
      {budgets && budgets.categories.length > 0 && <MonthSelector />}
      <AddBudgetDialog email={email} />
    </div>
  )
}
