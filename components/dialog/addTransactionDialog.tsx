import React, { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { AddTransactionForm } from "@/components/form/addTransactionForm"
import { BudgetType } from "@/types"

export function AddTransactionDialog({ budget }: { budget: BudgetType }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className='absolute top-14 right-14 h-12 w-12 flex items-center justify-center text-2xl cursor-pointer font-semibold rounded-3xl text-white px-4 py-2 my-6 bg-primaryCustomColor hover:scale-125 transition-all duration-300 ease-in-out'>
        <span>+</span>
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
