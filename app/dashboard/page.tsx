import React from "react"
import { auth, currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { addUserToDB } from "@/lib/actionsUser"
import { BudgetCards } from "@/components/dashboard/BudgetCards"
import { CategoryCards } from "@/components/dashboard/CategoryCards"
import { TransactionCards } from "@/components/dashboard/TransactionCards"
import { getTransactionsByUser } from "@/lib/actionsTransaction"
import { findAllBudgetByUser } from "@/lib/actionsBudget"

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
  console.log("categories", budgets)
  return (
    <section className='flex flex-1 gap-2 flex-col font-bold  w-full  px-2'>
      <section>
        <h2>Hello {email}</h2>
      </section>
      <div className=''>
        <div className='flex'>
          <div className='w-2/3'>
            <BudgetCards budgets={budgets?.categories} />
            <CategoryCards categories={budgets?.categories} />
          </div>
          <section className='w-1/3 flex justify-center'>
            <TransactionCards transactions={transactions} />
          </section>
        </div>
      </div>
    </section>
  )
}
