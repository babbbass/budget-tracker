import React, { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { EditTransactionForm } from "@/components/form/EditTransactionForm"
import { Pencil } from "lucide-react"
import { findTransactionById } from "@/lib/actionsTransaction"
import { TransactionType } from "@/types"

export function EditTransactionDialog({
  idTransaction,
  onSuccess,
}: {
  idTransaction: string
  onSuccess: () => void
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [transaction, setTransaction] = useState<
    (TransactionType & { budget: { name: string } }) | null
  >(null)
  async function findTransaction(id: string) {
    const transaction = await findTransactionById(id)
    // @ts-expect-error "error type unknown"
    setTransaction(transaction)
  }

  useEffect(() => {
    findTransaction(idTransaction)
  }, [idTransaction])

  const handleFormSuccess = () => {
    setIsOpen(false)
    onSuccess()
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <Pencil className='w-4 h-4 mr-2 cursor-pointer hover:scale-125 transition-all duration-300 ease-in-out hover:text-teal-700' />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='text-2xl font-bold text-center text-teal-700 mb-8'>
            Modifier la transaction
          </DialogTitle>
        </DialogHeader>
        {transaction && (
          <EditTransactionForm
            transaction={transaction}
            budget={transaction?.budget.name}
            onSuccess={handleFormSuccess}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}
