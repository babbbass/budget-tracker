import React, { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { AddTransactionForm } from "@/components/form/addTransactionForm"
import { useBudgetStore } from "@/stores/budget.store"

export function AddTransactionDialog() {
  const [isOpen, setIsOpen] = useState(false)
  const { budget } = useBudgetStore()

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className='cursor-pointer font-semibold rounded-xl text-white px-4 py-2 mb-6 bg-sky-600'>
        + Ajoutez une transaction
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='text-center text-2xl'>
            Nouvelle transaction
          </DialogTitle>
        </DialogHeader>
        {budget && (
          <AddTransactionForm
            budget={{ budgetId: budget.id, budgetName: budget.name }}
            isOpen={setIsOpen}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}
