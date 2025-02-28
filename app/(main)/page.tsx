import React from "react"
import { auth, currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { Dashboard } from "@/components/dashboard/Dashboard"
import { findAllBudgetByUser } from "@/lib/actionsBudget"
import { BudgetAssistant } from "@/components/BudgetAssistant"

export default async function Home() {
  const { userId } = await auth()
  const user = await currentUser()

  const fullName = user?.firstName + " " + user?.lastName
  const email = user?.emailAddresses[0].emailAddress

  const budgets = email && (await findAllBudgetByUser(email))
  if (!budgets) {
    redirect("/dashboard/settings")
  }

  const userBudgets = budgets?.categories.filter((category) => {
    return category.budgets.length > 0
  })

  if (userBudgets?.length === 0) {
    redirect("/dashboard/settings")
  }

  return (
    <>
      <h3 className='text-slate-50 text-lg md:text-xl font-title mb-4'>
        Bonjour {email}
      </h3>
      <div className='w-full px-4 mb-4'>
        <BudgetAssistant userId={userId as string} />
      </div>
      <Dashboard userId={userId as string} fullName={fullName} email={email} />
    </>
  )
}
