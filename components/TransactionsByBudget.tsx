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
import { TransactionType } from "@/types"
import { EditTransactionDialog } from "@/components/dialog/EditTransactionDialog"
import { BudgetType } from "@/types"
import { DeleteTransactionDialog } from "./dialog/DeleteTransactionDialog"

export function TransactionsByBudget({
  budget,
}: // onSuccess,
{
  budget: BudgetType
  // onSuccess: () => void
}) {
  const handleFormSuccess = () => {
    console.log("success")
    // onSuccess()
  }
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
            <TableRow>
              <TableHead className='font-title text-slate-50'>Nom</TableHead>
              <TableHead className='text-center text-slate-50'>
                Montant
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {budget &&
              budget.transactions?.map((transaction: TransactionType) => (
                <TableRow
                  key={transaction.id}
                  className='border-0 cursor-pointer h-16 hover:bg-none'
                  // onClick={() => router.push(`/transactions/${transaction.id}`)}
                >
                  <TableCell className='font-title text-slate-50'>
                    {transaction.name}
                  </TableCell>
                  <TableCell className='text-center font-sans text-slate-50'>
                    {transaction.amount} €
                  </TableCell>
                  <TableCell className='text-center font-sans text-slate-50'>
                    le {transaction.createdAt.getDate()}/
                    {transaction.createdAt.getMonth()}/
                    {transaction.createdAt.getFullYear()}
                  </TableCell>
                  <TableCell className='p-0 font-sans '>
                    <div className='flex gap-1 text-right'>
                      <EditTransactionDialog
                        idTransaction={transaction.id}
                        onSuccess={handleFormSuccess}
                      />

                      <DeleteTransactionDialog
                        idTransaction={transaction.id}
                        onSuccess={handleFormSuccess}
                      />
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
