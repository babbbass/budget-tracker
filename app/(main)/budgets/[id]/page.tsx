"use client"
import React, { useEffect } from "react"
import { useParams } from "next/navigation"
import { BudgetCard } from "@/components/BudgetCard"
import { AddTransactionDialog } from "@/components/dialog/addTransactionDialog"
import { TransactionsByBudget } from "@/components/TransactionsByBudget"
import { getBudgetById } from "@/lib/actionsBudget"
import { BudgetType } from "@/types"
import { LoadingSpinner } from "@/components/LoadingSpinner"

export default function Page() {
  const [budget, setBudget] = React.useState<BudgetType | null>(null)

  async function fetchBudgets(id: string) {
    try {
      const budget = await getBudgetById(id)
      //@ts-expect-error "error type unknown"
      setBudget(budget)
    } catch (err: unknown) {
      //@ts-expect-error "error type unknown"
      console.log({ error: err.message })
    }
  }

  const { id } = useParams()
  const idBudget = String(id)

  useEffect(() => {
    if (id) {
      fetchBudgets(idBudget)
    }
  }, [])

  if (!budget) {
    return (
      <div className='flex flex-1 justify-center items-center'>
        <LoadingSpinner />
      </div>
    )
  }
  return (
    <div className='flex flex-col items-start w-full md:w-2/3 flex-1 gap-14 px-4'>
      <BudgetCard budget={budget} />

      <AddTransactionDialog budget={budget} />
      {/* @ts-expect-error "error type unknown" */}
      <TransactionsByBudget budget={budget} />
    </div>
  )
}
