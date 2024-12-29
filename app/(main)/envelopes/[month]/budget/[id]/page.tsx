"use client"
import React from "react"
import { useMonth } from "@/hooks/useMonths"
import { useBudgetById } from "@/hooks/useBudgets"
import { useParams, useRouter } from "next/navigation"
import { useUser } from "@clerk/nextjs"
import { BudgetCard } from "@/components/BudgetCard"
import { AddTransactionDialog } from "@/components/dialog/addTransactionDialog"
import { TransactionsByBudget } from "@/components/TransactionsByBudget"
import { LoadingSpinner } from "@/components/LoadingSpinner"
import { CircleChevronLeft } from "lucide-react"

export default function Page() {
  const { month, id } = useParams()
  const { user } = useUser()
  const router = useRouter()
  const email = user?.emailAddresses[0]?.emailAddress || ""

  const { data: monthPlan } = useMonth(email, month as string)
  const { data: budget, isLoading } = useBudgetById(id as string)

  if (isLoading) {
    return (
      <div className='flex flex-1 justify-center items-center'>
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <>
      <div className='flex items-start flex-col mb-8 w-full md:w-2/3'>
        <CircleChevronLeft
          className='ml-3 h-10 mb-1 w-10 text-slate-50 cursor-pointer text-left hover:scale-110 transition-all duration-300 ease-in-out'
          onClick={() => router.back()}
        />
        <p className='text-slate-50 text-xs'>page précédente</p>
      </div>
      <div className='flex flex-1 justify-start items-center w-full md:w-2/3 p-2 flex-col gap-4'>
        {monthPlan && (
          // @ts-expect-error "error type unknown"
          <AddTransactionDialog budget={budget} monthPlan={monthPlan} />
        )}
        {/* @ts-expect-error "error type unknown" */}
        {budget && <BudgetCard budget={budget} />}
        {/* @ts-expect-error "error type unknown" */}
        {budget?.transactions && <TransactionsByBudget budget={budget} />}
      </div>
    </>
  )
}
