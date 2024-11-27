import React from "react"
import { Card, CardContent } from "./ui/card"
import { TransactionType } from "@/types"

export function TransactionCard({
  transaction,
  category,
  budget,
}: {
  transaction: TransactionType
  category: string | undefined
  budget: string | undefined
}) {
  return (
    <Card className='flex items-center h-full w-1/3'>
      <CardContent className='flex justify-between w-full p-4'>
        <div>
          <h3>{category}</h3>
          <span>{budget}</span>
        </div>
        <div>
          <h3>{transaction.description}</h3>
          <span className='mr-2'>{transaction.amount}€</span>
        </div>
      </CardContent>
    </Card>
  )
}
