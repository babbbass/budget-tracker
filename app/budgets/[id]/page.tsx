"use client"
import React, { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { getBudget } from "@/lib/actionsBudget"
import { SubCategoryType } from "@/types"
import { BudgetCard } from "@/components/BudgetCard"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { AddTransactionForm } from "@/components/form/addTransactionForm"
import TransactionsByBudget from "@/components/TransactionsByBudget"
import { Separator } from "@/components/ui/separator"

export default function Page() {
  const [budget, setBudget] = useState<SubCategoryType | null>(null)
  const { id } = useParams()

  async function fetchBudget(budgetId: number) {
    try {
      const budgetData = await getBudget(budgetId)
      setBudget(budgetData)
    } catch (error) {
      console.error(
        "Erreur lors de la récupération du budget et des transactions:",
        error
      )
    }
  }

  useEffect(() => {
    const budget = async () => {
      await fetchBudget(Number(id))
    }

    budget()
  }, [id])

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
      {/* <Button className='mt-4 bg-sky-600 font-semibold hover:bg-sky-600/50 transition-all'>
        + nouvelle transaction
      </Button> */}
      <Dialog>
        <DialogTrigger className=' cursor-pointer font-semibold rounded-xl text-white px-4 py-2 mb-6 bg-sky-600'>
          + Ajoutez une transaction
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className='text-center text-2xl'>
              Nouvelle transaction
            </DialogTitle>
            {/* <DialogDescription className='text-center my-4'>
              Ajoutez ici votre nouvelle transaction
            </DialogDescription> */}
          </DialogHeader>
          <AddTransactionForm
            budget={{ budgetId: budget.id, budgetName: budget.name }}
          />
        </DialogContent>
      </Dialog>
      <Separator className='mb-10' />
      <h3 className='font-semibold text-xl text-center w-full mb-8'>
        Toutes mes Transactions
      </h3>
      <TransactionsByBudget transactions={budget.transactions} />
    </div>
  )
}
