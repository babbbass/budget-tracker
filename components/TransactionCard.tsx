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
    <Card className='flex items-center h-full w-full hover:bg-gray-200 border-0 cursor-pointer'>
      <CardContent className='flex justify-between items-center w-full p-4'>
        <div>
          <span>{budget}</span>
        </div>
        <div>
          <h3>{transaction.description}</h3>
          <span className='mr-2'>{transaction.amount}€</span>
        </div>
        <div>
          <span>
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
