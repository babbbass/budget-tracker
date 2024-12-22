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
import { addBudget, deleteBudgetAction } from "@/lib/actionsBudget"
import { useUser } from "@clerk/nextjs"
import { LoadingSpinner } from "@/components/LoadingSpinner"
import { AddBudgetDialog } from "@/components/dialog/addBudgetDialog"
import { FilePenLine, Trash } from "lucide-react"
import { useRouter, usePathname } from "next/navigation"
import { useQueryClient } from "@tanstack/react-query"

type BudgetItem = {
  id: string
  name: string
  amount: number
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
  const pathname = usePathname()

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
        const validBudgets = category.budgets.filter(
          (budget) => budget.name.trim() !== ""
        )

        if (validBudgets.length === 0) continue

        for (const budget of validBudgets) {
          await addBudget({
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

  async function deleteBudget(budgetId: string) {
    try {
      await deleteBudgetAction(budgetId, pathname)
      queryClient.invalidateQueries({ queryKey: ["categories"] })
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
    <Card key={category.name} className='w-full mb-4'>
      <CardHeader>
        <CardTitle className='flex justify-between items-center'>
          {category.name}
          <span>
            Total: {calculateTotal(category.budgets).toLocaleString()}€
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            {/* <TableRow>
              <TableHead className='w-[200px]'>Libellé</TableHead>
              <TableHead className='text-right'>Montant</TableHead>
            </TableRow> */}
          </TableHeader>
          <TableBody>
            {category.budgets.map((budget) => (
              <TableRow key={budget.id}>
                <TableCell>{budget.name}</TableCell>
                <TableCell className='flex justify-end gap-2'>
                  <span>{budget.amount || ""}€</span>{" "}
                  <FilePenLine className='w-4 h-4 text-primary cursor-pointer' />
                  <Trash
                    className='w-4 h-4 text-red-600 cursor-pointer'
                    onClick={() => deleteBudget(budget.id)}
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
      <h1 className='text-2xl text-primary mb-10 text-center font-title'>
        Configurez vos enveloppes
      </h1>

      {categories?.map((category) => renderCategoryCard(category))}

      <Button
        className='w-3/4 text-white bg-primary hover:bg-primary/80 font-sans my-8 mx-auto'
        onClick={handleSubmit}
        disabled={isLoading}
      >
        {isLoading ? "Enregistrement..." : "Enregistrer votre configuration"}
      </Button>
    </div>
  )
}
