import React from "react"
import { addUserToDB } from "@/lib/actionsUser"
import { BudgetCards } from "@/components/dashboard/BudgetCards"
import { CategoryCards } from "@/components/dashboard/CategoryCards"
import { TransactionCards } from "@/components/dashboard/TransactionCards"
import { getTransactionsByUser } from "@/lib/actionsTransaction"
import { findAllBudgetByUser } from "@/lib/actionsBudget"
// import { ExportButton } from "@/components/ExportButton"
import { FirstBudget } from "@/components/FirstBudget"
import { AddBudgetDialog } from "@/components/dialog/addBudgetDialog"

type Dashboard = {
  userId: string
  fullName: string
  email: string
}

export async function Dashboard({ userId, fullName, email }: Dashboard) {
  await addUserToDB(userId, fullName, email)
  const budgets = await findAllBudgetByUser(email)
  const transactions = await getTransactionsByUser(email, "last365")
  if (!budgets) {
    return null
  }
  return (
    <section className='bg-gray-50 flex flex-1 gap-2 flex-col font-bold w-full px-4'>
      <section className='flex flex-col gap-4 justify-between items-center md:flex-row'>
        <div>
          <h3 className='text-primary font-title font-medium'>
            Bonjour {email}
          </h3>
          <p className='font-sans text-gray-600 text-sm'>
            Bienvenue sur votre tableau de bord
          </p>
        </div>
        <div className='flex gap-10 md:gap-2 items-center justify-between'>
          <span className='text-sm italic font-normal'>
            {new Date().toLocaleDateString("fr-FR")}
          </span>
          {/* <ExportButton budgets={budgets?.categories} /> */}
          <AddBudgetDialog email={email} />
        </div>
      </section>
      {budgets && budgets.categories.length === 0 && (
        <FirstBudget email={email} />
      )}
      <div className='flex flex-col items-center gap-3 md:flex-row md:items-start'>
        <div className='md:w-2/3 w-full flex flex-col items-start'>
          {/* @ts-expect-error "error type unknown */}
          {budgets && <BudgetCards budgets={budgets?.categories} />}
          {/* @ts-expect-error "error type unknown */}
          <CategoryCards categories={budgets?.categories} />
        </div>
        <section className='w-full md:w-1/3 flex justify-center'>
          {/* @ts-expect-error "error type unknown */}
          <TransactionCards transactions={transactions} />
        </section>
      </div>
    </section>
  )
}
