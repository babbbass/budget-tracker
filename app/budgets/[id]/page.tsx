"use client"
import React, { useEffect } from "react"
import { useParams } from "next/navigation"
import { BudgetCard } from "@/components/BudgetCard"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { AddTransactionDialog } from "@/components/dialog/addTransactionDialog"
import { TransactionsByBudget } from "@/components/TransactionsByBudget"
import { Separator } from "@/components/ui/separator"
import { useBudgetStore } from "@/stores/budget.store"

export default function Page() {
  const { fetchBudgets, budget } = useBudgetStore()
  const { id } = useParams()
  const idBudget = String(id)
  console.log(budget)
  useEffect(() => {
    if (id) {
      fetchBudgets(idBudget)
    }
  }, [idBudget])

  if (!budget) {
    return <div>Chargement...</div>
  }
  return (
    <div className='flex flex-col items-start w-full md:w-1/3'>
      <BudgetCard budget={budget} />
      <Button className='mt-4 bg-sky-600 font-semibold hover:bg-sky-600/50 transition-all mb-10'>
        <Trash2 />
        Supprimer
      </Button>
      <AddTransactionDialog />
      <Separator className='mb-10' />
      <h3 className='font-semibold text-xl text-center w-full mb-8'>
        Toutes mes Transactions
      </h3>
      <TransactionsByBudget />
    </div>
  )
}
