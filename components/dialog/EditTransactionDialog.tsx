import React, { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { EditTransactionForm } from "@/components/form/EditTransactionForm"
import { Pencil } from "lucide-react"

export function EditTransactionDialog({
  transaction,
  budgetName,
}: {
  transaction: {
    id: string
    amount: number
    name: string
    budgetId: string
  }
  budgetName: string
}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <Pencil className='w-4 h-4 cursor-pointer hover:scale-125 transition-all duration-300 ease-in-out hover:text-primary' />
      </DialogTrigger>
      <DialogContent className='text-sans'>
        <DialogHeader>
          <DialogTitle className='text-center text-2xl text-primary font-title'>
            Modifier la transaction
          </DialogTitle>
        </DialogHeader>
        {transaction && (
          <EditTransactionForm
            transaction={transaction}
            budgetName={budgetName}
            isOpen={setIsOpen}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}
