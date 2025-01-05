"use client"
import React from "react"
import { useBudgetsForMonth } from "@/hooks/useMonths"
import { useBudgetById } from "@/hooks/useBudgets"
import { useParams, useRouter } from "next/navigation"
import { useUser } from "@clerk/nextjs"
import { BudgetCard } from "@/components/BudgetCard"
import { AddTransactionDialog } from "@/components/dialog/addTransactionDialog"
import { TransactionsByBudget } from "@/components/TransactionsByBudget"
import { LoadingSpinner } from "@/components/LoadingSpinner"
import { BackNavigation } from "@/components/navigation/BackNavigation"

export default function Page() {
  const router = useRouter()
  const { month, id } = useParams()
  const { user } = useUser()
  const email = user?.emailAddresses[0]?.emailAddress || ""

  const { data: monthPlan } = useBudgetsForMonth(email, month as string)
  const { data: budget, isLoading } = useBudgetById(id as string)

  if (isLoading) {
    return <LoadingSpinner />
  }
  return (
    <>
      <div className='flex items-start  justify-between mb-8 w-full md:w-2/3 px-2'>
        <BackNavigation router={router} />
        {monthPlan && budget && (
          <AddTransactionDialog
            budget={{ id: budget.id, name: budget.name }}
            // @ts-expect-error "error type unknown"
            monthPlan={monthPlan}
          />
        )}
      </div>
      <div className='flex flex-1 justify-start items-center w-full md:w-2/3 p-2 flex-col gap-4'>
        {/* @ts-expect-error "error type unknown" */}
        {budget && <BudgetCard budget={budget} />}
        {/* @ts-expect-error "error type unknown" */}
        {budget?.transactions && <TransactionsByBudget budget={budget} />}
      </div>
    </>
  )
}
