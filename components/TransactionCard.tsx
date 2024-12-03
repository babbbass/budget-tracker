import React from "react"
import { Card, CardContent } from "./ui/card"
import { TransactionType } from "@/types"

export function TransactionCard({
  transaction,
  budget,
}: {
  transaction: TransactionType
  budget: string | undefined
}) {
  return (
    <Card className='flex flex-col sm:flex-row items-center h-full w-full hover:bg-gray-200 border-0 cursor-pointer'>
      <CardContent className='flex flex-col sm:flex-row justify-between items-start sm:items-center w-full p-4 space-y-4 sm:space-y-0'>
        <div className='w-full sm:w-auto'>
          <span>{budget}</span>
        </div>
        <div className='w-full sm:w-auto text-center sm:text-left'>
          <h3 className='text-lg font-semibold'>{transaction.description}</h3>
          <span className='mr-2 text-gray-600'>{transaction.amount}€</span>
        </div>
        <div className='w-full sm:w-auto text-right sm:text-left'>
          <span className='text-sm text-gray-500'>
            {transaction.createdAt.toLocaleDateString("fr-FR")} à{" "}
            {transaction.createdAt.toLocaleTimeString("fr-FR", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
