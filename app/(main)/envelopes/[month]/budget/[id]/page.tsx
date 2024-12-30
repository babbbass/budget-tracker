"use client"
import React, { Suspense } from "react"
import { useMonth } from "@/hooks/useMonths"
import { useBudgetById } from "@/hooks/useBudgets"
import { useParams, useRouter } from "next/navigation"
import { useUser } from "@clerk/nextjs"
import { BudgetCard } from "@/components/BudgetCard"
import { AddTransactionDialog } from "@/components/dialog/addTransactionDialog"
import { TransactionsByBudget } from "@/components/TransactionsByBudget"
import { LoadingSpinner } from "@/components/LoadingSpinner"
import { BackNavigation } from "@/components/navigation/BackNavigation"

export default function Page() {
  const { month, id } = useParams()
  const { user } = useUser()
  const router = useRouter()
  const email = user?.emailAddresses[0]?.emailAddress || ""

  const { data: monthPlan } = useMonth(email, month as string)
  const { data: budget } = useBudgetById(id as string)

  return (
    <>
      <BackNavigation router={router} />
      <Suspense fallback={<LoadingSpinner />}>
        <div className='flex flex-1 justify-start items-center w-full md:w-2/3 p-2 flex-col gap-4'>
          {monthPlan && budget && (
            <AddTransactionDialog
              budget={{ id: budget.id, name: budget.name }}
              monthPlan={monthPlan}
            />
          )}
          {/* @ts-expect-error "error type unknown" */}
          {budget && <BudgetCard budget={budget} />}
          {/* @ts-expect-error "error type unknown" */}
          {budget?.transactions && <TransactionsByBudget budget={budget} />}
        </div>
      </Suspense>
    </>
  )
}
