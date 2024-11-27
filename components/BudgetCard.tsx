import React from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { SubCategoryType, TransactionType } from "@/types"

function costTotalTransactions(transactions: TransactionType[]) {
  return transactions.reduce((total, transaction) => {
    return total + transaction.amount
  }, 0)
}
export function BudgetCard({ budget }: { budget: SubCategoryType }) {
  const totalTransactionAmount = costTotalTransactions(
    budget?.transactions || []
  )
  const progressValue =
    totalTransactionAmount > budget.amount
      ? 100
      : (totalTransactionAmount / budget.amount) * 100

  const amountRemaining = budget?.amount - totalTransactionAmount
  return (
    <Card className='w-full'>
      <CardHeader className='flex flex-row justify-between items-center border-b py-1 mb-4'>
        <div>
          <h2 className='font-bold text-2xl'>{budget?.name}</h2>
          <span>{budget?.transactions.length} transaction(s)</span>
        </div>
        <span className='font-semibold text-sky-600'>{budget?.amount}€</span>
      </CardHeader>
      <CardContent className='flex flex-col gap-2'>
        <div className='flex justify-between'>
          <span>{totalTransactionAmount}€ dépensés</span>
          <span>{amountRemaining}€ restants</span>
        </div>
        <span className='mt-4'>
          <Progress value={progressValue} indicatorColor='bg-sky-600' />
        </span>
      </CardContent>
    </Card>
  )
}
