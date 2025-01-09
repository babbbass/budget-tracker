"use client"
import React from "react"
import { useParams } from "next/navigation"
import { BudgetCard } from "@/components/BudgetCard"
import { AddTransactionDialog } from "@/components/dialog/addTransactionDialog"
import { TransactionsByBudget } from "@/components/TransactionsByBudget"
import { getBudgetById } from "@/lib/actionsBudget"
import { LoadingSpinner } from "@/components/LoadingSpinner"
import { useQuery } from "@tanstack/react-query"
import { Error } from "@/components/Error"

export default function Page() {
  const { id } = useParams()

  const { data, isLoading, error } = useQuery({
    queryKey: ["budget"],
    queryFn: () => getBudgetById(String(id)),
  })

  if (isLoading) {
    return (
      <div className='flex flex-1 justify-center items-center'>
        <LoadingSpinner />
      </div>
    )
  }
  if (error) {
    return <Error />
  }
  console.log(data)
  return (
    <div className='flex flex-col items-start w-full md:w-2/3 flex-1 gap-14 px-4'>
      {/* @ts-expect-error "error type unknown" */}
      <BudgetCard budget={data} />

      {/* @ts-expect-error "error type unknown" */}
      <AddTransactionDialog budget={data} />
      {/* @ts-expect-error "error type unknown" */}
      <TransactionsByBudget budget={data} />
    </div>
  )
}
