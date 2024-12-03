import React from "react"
import { auth, currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { addUserToDB } from "@/lib/actionsUser"
import { BudgetCards } from "@/components/dashboard/BudgetCards"
import { CategoryCards } from "@/components/dashboard/CategoryCards"
import { TransactionCards } from "@/components/dashboard/TransactionCards"
import { getTransactionsByUser } from "@/lib/actionsTransaction"
import { findAllBudgetByUser } from "@/lib/actionsBudget"
import { ExportButton } from "@/components/ExportButton"

export default async function Dashboard() {
  const { userId } = await auth()
  const user = await currentUser()

  if (!userId || !user) {
    redirect("/connexion")
  }

  const fullName = user.firstName + " " + user.lastName
  const email = user.emailAddresses[0].emailAddress

  await addUserToDB(userId, fullName, email)
  const budgets = await findAllBudgetByUser(email)
  const transactions = await getTransactionsByUser(email, "last365")
  // console.log("categories", budgets)
  return (
    <section className='flex flex-1 gap-2 flex-col font-bold w-full px-4'>
      <section className='flex justify-between items-center'>
        <div>
          <h3 className='font-medium'>Hello {email}</h3>
          <p className='text-sm text-gray-500'>
            Bienvenue sur votre tableau de bord
          </p>
        </div>
        <div className='flex gap-2 items-center'>
          <span className='text-sm italic font-normal'>
            {new Date().toLocaleDateString("fr-FR")}
          </span>
          <ExportButton budgets={budgets} />
        </div>
      </section>
      {/* <div className='h-full'> */}
      <div className='flex flex-col items-center gap-3 md:flex-row md:items-start'>
        <div className='md:w-2/3 w-full flex flex-col items-start'>
          <BudgetCards budgets={budgets?.categories} />
          <CategoryCards categories={budgets?.categories} />
        </div>
        <section className='w-full md:w-1/3 flex justify-center'>
          <TransactionCards transactions={transactions} />
        </section>
      </div>
      {/* </div> */}
    </section>
  )
}
