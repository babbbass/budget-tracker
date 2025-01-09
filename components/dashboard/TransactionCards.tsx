"use client"
import React from "react"
import { Card, CardContent } from "../ui/card"
import { TransactionType, BudgetType } from "@/types"
import { ArrowRightLeft } from "lucide-react"

export function TransactionCards({
  transactions,
}: {
  transactions: BudgetType[]
}) {
  return (
    <div className='w-full py-4 mx-1 flex flex-col'>
      <div className='flex flex-col mb-6'>
        <h2 className='text-primary text-3xl font-title flex items-center gap-3'>
          <ArrowRightLeft className='inline h-6 w-6 text-gray-800' />
          Transactions
        </h2>
        <p className='text-sm text-gray-600 font-sans'>
          Vos dernières transactions
        </p>
      </div>
      <section className='flex flex-col gap-4'>
        {transactions.map((budget: BudgetType) =>
          budget.transactions?.map((transaction: TransactionType) => (
            <Card
              key={transaction.id}
              className='flex flex-col sm:flex-row items-start sm:items-center p-0 min-h-14 border border-[#118D70]'
            >
              <CardContent className='p-4 w-full'>
                <p className='flex flex-row text-sm gap-2 justify-between font-sans text-gray-900'>
                  <span className='text-sm'>{transaction.name}</span>
                  <span className='text-right sm:text-left text-emerald-600'>
                    {transaction.amount}€
                  </span>
                </p>
              </CardContent>
            </Card>
          ))
        )}
      </section>
    </div>
  )
}
