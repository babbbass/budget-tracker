"use client"
import React from "react"
import { Card, CardContent } from "../ui/card"
import { TransactionType, BudgetType } from "@/types"

export function TransactionCards({
  transactions,
}: {
  transactions: BudgetType[]
}) {
  return (
    <div className='w-full py-4 mx-1 flex flex-col'>
      <div className='flex flex-col mb-6'>
        <h2 className='text-primary text-3xl font-bold'>Transactions</h2>
        <p className='text-sm text-gray-600'>Vos dernières transactions</p>
      </div>
      <section className='flex flex-col gap-4'>
        {transactions.map((budget: BudgetType) =>
          budget.transactions?.map((transaction: TransactionType) => (
            <Card
              key={transaction.id}
              className='flex flex-col sm:flex-row items-start sm:items-center p-0 min-h-14 border border-[#118D70]'
            >
              <CardContent className='p-4 w-full'>
                <p className='flex flex-col sm:flex-row text-sm gap-2 sm:justify-between'>
                  <span className='font-sans text-sm'>
                    {transaction.description}
                  </span>
                  <span className='text-right sm:text-left text-emerald-600 font-sans'>
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
