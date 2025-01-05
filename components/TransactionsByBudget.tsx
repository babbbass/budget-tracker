"use client"
import React from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  TableHead,
} from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"
import { EditTransactionDialog } from "@/components/dialog/EditTransactionDialog"
import { DeleteTransactionDialog } from "./dialog/DeleteTransactionDialog"

export function TransactionsByBudget({
  budget,
}: {
  budget: {
    name: string
    transactions: {
      id: string
      budgetId: string
      amount: number
      name: string
      budget: { name: string; id: string }
      createdAt: Date
      updatedAt: Date
    }[]
  }
}) {
  // const handleFormSuccess = () => {
  //   console.log("success")
  // }
  if (!budget) {
    return <div>Chargement...</div>
  }

  if (budget.transactions?.length === 0) {
    return (
      <p className='text-slate-50 text-center w-full font-sans'>
        Aucune transaction enregistré
      </p>
    )
  }

  return (
    <>
      <h3 className='font-title text-xl text-center w-full my-8'>
        Transactions de {budget.name}
      </h3>

      <ScrollArea className='max-w-full overflow-x-auto w-full md:w-2/3'>
        <Table className='w-full font-sans'>
          <TableHeader>
            <TableRow className='hover:bg-transparent'>
              <TableHead className='font-title text-slate-50'>Nom</TableHead>
              <TableHead className='text-center text-slate-50'>
                Montant
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {budget &&
              budget.transactions?.map((transaction) => (
                <TableRow
                  key={transaction.id}
                  className='border-0 border-b cursor-pointer h-16 hover:bg-transparent'
                  // onClick={() => router.push(`/transactions/${transaction.id}`)}
                >
                  <TableCell className='font-title text-slate-50'>
                    {transaction.name}
                  </TableCell>
                  <TableCell className='text-center font-sans text-slate-50'>
                    {transaction.amount} €
                  </TableCell>
                  <TableCell className='text-center font-sans text-slate-50'>
                    {/* le {transaction.createdAt.getDate()}/
                    {transaction.createdAt.getMonth()}/
                    {transaction.createdAt.getFullYear()} */}
                  </TableCell>
                  <TableCell className='p-0 font-sans '>
                    <div className='flex gap-4 text-right'>
                      <EditTransactionDialog
                        transaction={transaction}
                        budgetName={budget.name}
                      />
                      <DeleteTransactionDialog transaction={transaction} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </>
  )
}
