"use client"

import React from "react"
import { useCategories } from "@/hooks/useCategories"
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { addBudgetForSetting, deleteBudgetAction } from "@/lib/actionsBudget"
import { useUser } from "@clerk/nextjs"
import { LoadingSpinner } from "@/components/LoadingSpinner"
import { AddBudgetDialog } from "@/components/dialog/addBudgetDialog"
import { FilePenLine, Trash } from "lucide-react"
import { useRouter } from "next/navigation"
import { useQueryClient } from "@tanstack/react-query"
import { Mail } from "lucide-react"

type BudgetItem = {
  id: string
  name: string
  amount: number
  monthlyPlans: {
    id: string
    budgetId: string
    monthlyPlanId: string
  }[]
}

type CategoryWithBudgets = {
  id: string
  name: string
  budgets: BudgetItem[]
}

export default function BudgetConfiguration() {
  const router = useRouter()
  const { user } = useUser()
  const queryClient = useQueryClient()

  const email = user?.emailAddresses[0].emailAddress || ""
  const { data: categories, isLoading } = useCategories(email)

  if (isLoading) {
    return (
      <div className='flex flex-1 justify-center items-center'>
        <LoadingSpinner />
      </div>
    )
  }

  const calculateTotal = (budgets: BudgetItem[]) =>
    budgets.reduce((sum, item) => sum + item.amount, 0)

  const handleSubmit = async () => {
    if (!categories) return
    try {
      for (const category of categories) {
        // @ts-expect-error "error type unknown"
        for (const budget of category) {
          await addBudgetForSetting({
            email: email,
            budgetName: budget.name,
            categoryName: category.name,
            amount: budget.amount,
          })
        }
      }

      toast.success("Configuration budgétaire enregistrée")
    } catch (error) {
      console.error("Erreur lors de l'enregistrement:", error)
      toast.error("Échec de l'enregistrement")
    }
  }

  async function deleteBudget(budget: BudgetItem) {
    try {
      await deleteBudgetAction(budget)
      queryClient.invalidateQueries({ queryKey: ["categories", "budgets"] })
      toast.success("Enveloppe supprimée !", {
        duration: 1500,
        className: "text-primary",
      })
      router.refresh()
    } catch (error) {
      console.error("Erreur lors de la suppression du budget:", error)
      toast.error("Une erreur est survenue", {
        duration: 1500,
        className: "text-red-500",
      })
    }
  }

  const renderCategoryCard = (category: CategoryWithBudgets) => (
    <Card key={category.name} className='w-full mb-4 p-2 bg-slate-50'>
      <CardHeader className='p-2'>
        <CardTitle className='flex justify-between items-center font-title text-lg md:text-2xl w-full'>
          <span>{category.name}</span>
          <span className='font-sans text-base'>
            {calculateTotal(category.budgets).toLocaleString()}€
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className='p-2'>
        <Table>
          <TableHeader>
            {/* <TableRow>
              <TableHead className='w-[200px]'>Libellé</TableHead>
              <TableHead className='text-right'>Montant</TableHead>
            </TableRow> */}
          </TableHeader>
          <TableBody>
            {category.budgets.map((budget) => (
              <TableRow key={budget.id} className='font-sans'>
                <TableCell>{budget.name.toUpperCase()}</TableCell>
                <TableCell className='flex justify-end items-center gap-2'>
                  <span className=' mr-4'>{budget.amount || ""}€</span>{" "}
                  <FilePenLine className='w-4 h-4 text-primary cursor-pointer' />
                  <Trash
                    className='w-4 h-4 text-red-600 cursor-pointer'
                    onClick={() => deleteBudget(budget)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className='w-full flex justify-end mt-8'>
          <AddBudgetDialog
            className='shadow-lg'
            email={email}
            triggerSentence='Nouvelle enveloppe'
            category={{
              id: category.id,
              name: category.name,
            }}
          />
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className='w-full max-w-4xl mx-auto p-4 space-y-4 flex flex-1 flex-col gap-4'>
      <div className='flex items-center justify-center mb-6'>
        <Mail className='inline h-6 w-6 text-slate-200 mr-2' />
        <h1 className='text-lg md:text-3xl text-slate-50  text-center font-title'>
          Créez vos enveloppes
        </h1>
      </div>
      {/* @ts-expect-error "error type unknown" */}
      {categories?.map((category) => renderCategoryCard(category))}

      <div className='w-full flex justify-end mt-10'>
        <Button
          className='text-emerald-800 bg-slate-50 hover:bg-primary/80 hover:text-slate-50 font-sans mr-2'
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? "Enregistrement..." : "Enregistrer votre configuration"}
        </Button>
      </div>
    </div>
  )
}
