import { currentUser } from "@clerk/nextjs/server"
import React from "react"
import { redirect } from "next/navigation"
import { getBudgetsByCategory } from "@/lib/actionsBudget"
import { CategoriesEnum as Categories } from "@/types"
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
  if (budgets?.categories.length === 0 || !budgets) {
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
    <div className='flex flex-1 flex-col w-full items-center'>
      <h1 className='text-2xl md:text-3xl font-title flex items-center gap-3 mb-6'>
        {`Suivi de l'épargne`}{" "}
        <PiggyBank className='inline h-8 w-8 md:h-10 md:w-10 text-primary' />
      </h1>
      <div className='container py-2 my-4 border-t-2 border-b-2 flex flex-wrap min-h-20 text-xs'>
        <div className='w-full sm:w-1/2 md:w-1/4 flex flex-col justify-center gap-2 items-center font-sans  p-2'>
          <span>OBJECTIF GLOBAL</span>
          <span className='font-sans text-xl md:text-2xl text-gray-800'>
            {savingTotalAmount}
          </span>
        </div>
        <div className='w-full sm:w-1/2 md:w-1/4 flex flex-col justify-center gap-2 items-center font-sans p-2'>
          <span>MONTANT ÉPARGNÉ</span>
          <span className='font-sans text-xl md:text-2xl text-gray-800'>
            {totalSaved}
          </span>
        </div>
        <div className='w-full sm:w-1/2 md:w-1/4 flex flex-col justify-center gap-2 items-center font-sans p-2'>
          <span>MONTANT RESTANT</span>
          <span className='font-sans text-xl md:text-2xl text-gray-800'>
            {remainingAmount}
          </span>
        </div>
        <div className='w-full sm:w-1/2 md:w-1/4 flex flex-col justify-center gap-2 items-center font-sans p-2'>
          <span>PROGRESSION</span>
          <span className='font-sans text-xl md:text-2xl text-gray-800'>
            {progression}%
          </span>
        </div>
      </div>
      {/* @ts-expect-error "error type unknown" */}
      <SavingBudgets budgets={budgets?.categories[0].budgets} />
    </div>
  )
}
