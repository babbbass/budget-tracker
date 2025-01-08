import { currentUser } from "@clerk/nextjs/server"
import React from "react"
import { redirect } from "next/navigation"
import { getBudgetsByCategory } from "@/lib/actionsBudget"
import { CategoriesEnum as Categories } from "@/types"
import { PiggyBank } from "lucide-react"
// import { SavingBudgets } from "@/components/SavingBudgets"
import { totalAmount } from "@/lib/calculations"
import { AddBudgetDialog } from "@/components/dialog/addBudgetDialog"

export default async function SavingsPage() {
  const user = await currentUser()
  if (!user) {
    redirect("/connexion")
  }
  const email = user.emailAddresses[0].emailAddress
  const budgets = await getBudgetsByCategory(email, Categories.EPARGNES)
  const notSavingBudgets =
    budgets?.categories.length === 0 ||
    !budgets ||
    budgets.categories[0].budgets.length === 0

  if (notSavingBudgets) {
    return (
      <div className='flex flex-1 flex-col w-full md:w-2/3 gap-10 items-center px-2'>
        <h1 className='text-2xl md:text-3xl font-title  flex items-center gap-3'>
          <PiggyBank className='inline h-10 w-10 text-primary' />
          {`Suivi de l'épargne`}{" "}
        </h1>
        <span className='text-slate-50 text-left md:text-lg font-sans'>{`Vous n'avez pas encore de d'epargne enregistré`}</span>
        <AddBudgetDialog
          email={email}
          triggerSentence='+ Créez votre épargne'
          category={{ name: "Epargnes" }}
        />
      </div>
    )
  }

  //@ts-expect-error "error type unknown"
  const savingTotalAmount = totalAmount(budgets?.categories[0].budgets)

  function calculateTotalForEachObject(
    budgets: {
      amount: number
      startAmount: number
      transactions: { amount: number }[]
    }[]
  ) {
    return budgets.map((budget) => {
      const transactionsTotal = budget.transactions.reduce(
        (sum: number, transaction: { amount: number }) =>
          sum + transaction.amount,
        0
      )
      const total = budget.startAmount + transactionsTotal

      return {
        ...budget,
        total: total,
      }
    })
  }
  /* @ts-expect-error "error type unknown" */
  const savings = calculateTotalForEachObject(budgets?.categories[0].budgets)
  const totalSaved = savings.reduce(
    (total: number, obj: { total: number }) => total + obj.total,
    0
  )
  const remainingAmount = savingTotalAmount - totalSaved
  const progression = Number((totalSaved / savingTotalAmount) * 100).toFixed(2)
  return (
    <div className='flex flex-1 flex-col w-full items-center justify-center text-slate-50 px-4 md:w-2/3'>
      <h1 className='text-2xl md:text-3xl font-title flex items-center gap-3 mb-6'>
        <PiggyBank className='inline h-8 w-8 md:h-10 md:w-10 text-primary' />
        {`SUIVI EPARGNE`}
      </h1>
      <div className='w-full'>
        <div className='overflow-x-auto'>
          <table className='min-w-full bg-primary font-sans text-slate-50'>
            <thead className='bg-emerald-800 hidden md:table-header-group'>
              <tr>
                <th className='px-6 py-3 text-center text-xs font-medium text-slate-50 uppercase tracking-wide'>
                  OBJECTIF
                </th>
                <th className='px-6 py-3 text-center text-xs font-medium text-slate-50 uppercase tracking-wide'>
                  MONTANT ÉPARGNÉ
                </th>
                <th className='px-6 py-3 text-center text-xs font-medium text-slate-50 uppercase tracking-wide'>
                  MONTANT RESTANT
                </th>
                <th className='px-6 py-3 text-center text-xs font-medium text-slate-50 uppercase tracking-wide'>
                  PROGRESSION
                </th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-200'>
              {/* {budgets.map((budget) => ( */}
              <tr
                // key={budget.id}
                // onClick={() => router.push(`/budgets/${budget.id}`)}
                className='hover:bg-emerald-900  flex flex-col md:table-row'
              >
                <td className='px-6 py-4 whitespace-nowrap text-left md:text-center font-sans flex md:table-cell before:content-["OBJECTIF"] before:font-bold before:mr-2 md:before:content-none before:w-1/2 '>
                  {savingTotalAmount}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-left md:text-center font-sans flex md:table-cell before:content-["ÉPARGNÉ:"] before:font-bold before:mr-2 md:before:content-none before:w-1/2'>
                  {budgets?.categories[0].budgets[0]?.startAmount}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-left md:text-center font-sans flex md:table-cell before:content-["RESTANT:"] before:font-bold before:mr-2 md:before:content-none before:w-1/2'>
                  {remainingAmount}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-left md:text-center font-sans flex md:table-cell before:content-["PROGRESSION:"] before:font-bold before:mr-2 md:before:content-none before:w-1/2'>
                  {progression}%
                </td>
              </tr>
              {/* ))} */}
            </tbody>
          </table>
        </div>
      </div>
      {/* <SavingBudgets budgets={budgets?.categories[0].budgets} /> */}
    </div>
  )
}
