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
import {
  ChevronsUpDown,
  // ChevronRight,
  // ChevronLeft,
} from "lucide-react"
import { TransactionType } from "@/types"
import { EditTransactionDialog } from "@/components/dialog/EditTransactionDialog"
import { BudgetType } from "@/types"
import { DeleteTransactionDialog } from "./dialog/DeleteTransactionDialog"

export function TransactionsByBudget({
  budget,
  onSuccess,
}: {
  budget: BudgetType
  onSuccess: () => void
}) {
  const handleFormSuccess = () => {
    console.log("success")
    onSuccess()
  }
  if (!budget) {
    return <div>Chargement...</div>
  }
  return (
    <>
      <h3 className='font-semibold text-xl text-center w-full mb-8'>
        Toutes mes Transactions
      </h3>
      <ScrollArea className='max-w-full overflow-x-auto w-full'>
        <Table className='w-full'>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead
                className='cursor-pointer text-center'
                // onClick={() => handleSort("amount")}
              >
                Montant
                <ChevronsUpDown className='w-4 h-4 inline-block ml-1' />
              </TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {budget &&
              budget.transactions?.map((transaction: TransactionType) => (
                <TableRow
                  key={transaction.id}
                  className='hover:bg-gray-100 border-0 cursor-pointer h-16'
                  // onClick={() => router.push(`/transactions/${transaction.id}`)}
                >
                  <TableCell className='font-bold'>
                    {transaction.description}
                  </TableCell>
                  <TableCell className='text-center'>
                    {transaction.amount} €
                  </TableCell>
                  <TableCell>
                    <div className='flex gap-2'>
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
