import React from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { BudgetType } from "@/types"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { costTotalTransactions } from "@/lib/calculations"

export function BudgetCard({ budget }: { budget: BudgetType }) {
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
          <h2 className='italic font-semibold text-2xl '>{budget?.name}</h2>
          <span>{budget?.transactions.length} transaction(s)</span>
        </div>
        <span className='font-semibold text-emerald-600'>
          {budget?.amount}€
        </span>
      </CardHeader>
      <CardContent className='flex flex-col gap-2'>
        <div className='flex justify-between'>
          <span className='font-semibold text-sm'>
            {totalTransactionAmount}€ dépensés
          </span>
          <span className='font-semibold text-sm'>
            {amountRemaining}€ restants
          </span>
        </div>
        <span className='mt-4'>
          <Progress value={progressValue} indicatorColor='bg-emerald-600' />
        </span>
        <Button className='mt-4 bg-emerald-600 font-semibold hover:bg-emerald-600/50 transition-all'>
          <Trash2 />
          Supprimer
        </Button>
      </CardContent>
    </Card>
  )
}
