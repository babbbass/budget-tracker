import React, { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { AddTransactionForm } from "@/components/form/addTransactionForm"
import { BudgetType, MonthlyPlanType } from "@/types"

export function AddTransactionDialog({
  budget,
  monthPlan,
}: {
  budget: BudgetType
  monthPlan?: MonthlyPlanType
}) {
  const [isOpen, setIsOpen] = useState(false)
  console.log(budget, monthPlan)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className='absolute text-sm bottom-20 right-6 bg-primary flex items-center justify-center cursor-pointer font-semibold rounded-3xl text-white px-4 py-2 my-6 bg-primaryCustomColor hover:scale-105 hover:shadow-lg hover:cursor-pointer transition-all duration-300 ease-in-out font-sans flex-col'>
        <span>Nouvelle</span> <span>transaction</span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='text-center text-2xl text-emerald-600'>
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
