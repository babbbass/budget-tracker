import React, { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { AddTransactionForm } from "@/components/form/addTransactionForm"
import { MonthlyPlanType } from "@/types"

export function AddTransactionDialog({
  budget,
  monthPlan,
}: {
  budget: {
    id: string
    name: string
  }
  monthPlan?: MonthlyPlanType
}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className='text-xs md:text-sm bg-primary flex items-center justify-center cursor-pointer rounded-xl text-white px-4 py-2 bg-primaryCustomColor hover:scale-105 hover:shadow-lg hover:cursor-pointer transition-all duration-300 ease-in-out font-sans flex-col'>
        <span>Ajouter</span> <span>transaction</span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='text-center text-2xl text-primary'>
            Nouvelle transaction
          </DialogTitle>
        </DialogHeader>
        {budget && (
          <AddTransactionForm
            budget={{ budgetId: budget.id, budgetName: budget.name }}
            isOpen={setIsOpen}
            monthPlanId={monthPlan?.id}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}
