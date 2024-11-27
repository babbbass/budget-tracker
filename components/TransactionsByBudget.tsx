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
  Trash2,
  Pencil,
  // ChevronRight,
  // ChevronLeft,
} from "lucide-react"
import { TransactionType } from "@/types"

export function TransactionsByBudget({
  transactions,
}: {
  transactions: TransactionType[]
}) {
  return (
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
          {transactions.map((transaction: TransactionType) => (
            <TableRow
              key={transaction.id}
              className='hover:bg-gray-100 border-0 cursor-pointer h-16'
              // onClick={() => router.push(`/budgets/${transaction.id}`)}
            >
              <TableCell className='font-medium'>
                {transaction.description}
              </TableCell>
              <TableCell className='text-center'>
                {transaction.amount} €
              </TableCell>
              <TableCell>
                <div className='flex gap-2'>
                  <Pencil
                    className='w-4 h-4 mr-2'
                    // onClick={() => handleEdit(category.id)}
                  />
                  <Trash2
                    className='w-4 h-4 mr-2'
                    // onClick={() => handleDelete(category.id)}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  )
}
