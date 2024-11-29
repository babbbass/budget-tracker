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
    <div className='w-full p-4 mx-1 flex flex-col'>
      <div className='flex flex-col mb-6'>
        <h2 className='text-3xl font-bold'>Transactions</h2>
        <p className='text-sm text-gray-500'>Vos dernières transactions</p>
      </div>
      <section className='flex flex-col gap-4'>
        {transactions.map((budget: BudgetType) =>
          budget.transactions.map((transaction: TransactionType) => (
            <Card
              key={transaction.id}
              className=' flex items-center p-0 min-h-14 border-[#118D70]'
            >
              <CardContent className='p-2 w-full'>
                <p className='flex text-sm gap-2 justify-between'>
                  <span>{transaction.description}</span>
                  <span>{transaction.amount}€</span>
                </p>
              </CardContent>
            </Card>
          ))
        )}
      </section>
    </div>
  )
}
