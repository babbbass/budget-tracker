import { currentUser } from "@clerk/nextjs/server"
import React from "react"
import { redirect } from "next/navigation"
import { getBudgetsByCategory } from "@/lib/actionsBudget"
import { Categories } from "@/types"
import { PiggyBank } from "lucide-react"
import { SavingBudgets } from "@/components/SavingBudgets"
import { totalAmount } from "@/lib/calculations"
import { AddBudgetDialog } from "@/components/dialog/addBudgetDialog"

export default async function SavingsPage() {
  const user = await currentUser()
  if (!user) {
    redirect("/connexion")
  }
  const email = user.emailAddresses[0].emailAddress
  const budgets = await getBudgetsByCategory(email, Categories.EPARGNES)
  console.log(budgets?.categories[0].budgets)

  if (!budgets) {
    return (
      <div className='flex flex-1 flex-col w-full md:w-2/3 gap-10 items-center'>
        <h1 className='text-3xl font-title  flex items-center gap-3'>
          {`Suivi de l'épargne`}{" "}
          <PiggyBank className='inline h-10 w-10 text-primary' />
        </h1>
        <span className='text-gray-600 font-sans'>{`Vous n'avez pas encore de d'epargne enregistré`}</span>
        <AddBudgetDialog
          email={email}
          triggerSentence='+ Créez votre épargne'
        />
      </div>
    )
  }
  console.log(budgets?.categories[0].budgets)
  //@ts-expect-error "error type unknown"
  const savingTotalAmount = totalAmount(budgets?.categories[0].budgets)
  const totalSaved = budgets?.categories[0].budgets.reduce((total, budget) => {
    //@ts-expect-error "error type unknown"
    return total + totalAmount(budget.transactions)
  }, 0)
  if (!totalAmount) {
    return null
  }

  const remainingAmount = savingTotalAmount - totalSaved
  const progression = Number((totalSaved / savingTotalAmount) * 100).toFixed(2)
  return (
    <div className='flex flex-1 flex-col w-full md:w-2/3 gap-10 items-center'>
      <h1 className='text-3xl font-title  flex items-center gap-3'>
        {`Suivi de l'épargne`}{" "}
        <PiggyBank className='inline h-10 w-10 text-primary' />
      </h1>
      <div className='container py-4 my-4 border-t-2 border-b-2 flex h-20 gap-2'>
        <div className='w-1/4 flex flex-col justify-center gap-2 items-center font-sans'>
          <span>OBJECTIF GLOBAL</span>
          <span className='font-sans text-2xl text-gray-800'>
            {savingTotalAmount}
          </span>
        </div>
        <div className='w-1/4 flex flex-col justify-center gap-2 items-center font-sans'>
          MONTANT ÉPARGNÉ
          <span className='font-sans text-2xl text-gray-800'>{totalSaved}</span>
        </div>
        <div className='w-1/4 flex flex-col justify-center gap-2 items-center font-sans'>
          RESTE A FAIRE
          <span className='font-sans text-2xl text-gray-800'>
            {remainingAmount}
          </span>
        </div>
        <div className='w-1/4 flex flex-col justify-center gap-2 items-center font-sans'>
          PROGRESSION
          <span className='font-sans text-2xl text-gray-800'>
            {progression}%
          </span>
        </div>
      </div>
      {/* @ts-expect-error "error type unknown" */}
      <SavingBudgets budgets={budgets?.categories[0].budgets} />
    </div>
  )
}
