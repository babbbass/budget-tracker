"use client"
import React from "react"
import { useMonth } from "@/hooks/useMonths"
import { useBudgetById } from "@/hooks/useBudgets"
import { useParams } from "next/navigation"
import { useUser } from "@clerk/nextjs"
import { BudgetCard } from "@/components/BudgetCard"
import { AddTransactionDialog } from "@/components/dialog/addTransactionDialog"

export default function Page() {
  const { month, id } = useParams()
  const { user } = useUser()
  const email = user?.emailAddresses[0]?.emailAddress || ""

  const { data: monthPlan } = useMonth(email, month as string)
  const { data: budget } = useBudgetById(id as string)
  console.log(monthPlan, budget)

  return (
    <div className='flex flex-1 justify-center items-center w-2/3'>
      {monthPlan && (
        // @ts-expect-error "error type unknown"
        <AddTransactionDialog budget={budget} monthPlan={monthPlan} />
      )}
      {/* @ts-expect-error "error type unknown" */}
      {budget && <BudgetCard budget={budget} />}
    </div>
  )
}
