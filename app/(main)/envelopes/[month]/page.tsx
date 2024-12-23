"use client"
import React from "react"
import { useParams } from "next/navigation"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { LoadingSpinner } from "@/components/LoadingSpinner"
import { addBudgetForMonth, removeBudgetForMonth } from "@/lib/actionsBudget"
import { useUser } from "@clerk/nextjs"
import { useBudgets } from "@/hooks/useBudgets"
import { useMonth } from "@/hooks/useMonths"
import { useQueryClient } from "@tanstack/react-query"
import { Trash } from "lucide-react"

type Budget = {
  id: string
  name: string
  amount: number
  monthlyPlans: {
    id: string
    budgetId: string
    monthlyPlanId: string
  }[]
}

type Category = {
  id: string
  name: string
  userId?: string
  budgets: Budget[]
}

export default function MonthlyBudgetPage() {
  const { user } = useUser()
  const { month } = useParams()
  const queryClient = useQueryClient()
  const email = user?.emailAddresses[0].emailAddress || ""
  const { data: budgets, isLoading } = useBudgets(email)
  const { data: monthDb } = useMonth(email, month as string)

  const budgetsForMonth = budgets?.categories
    .map((category) => {
      const filteredBudgets = category.budgets.filter((budget) =>
        budget.monthlyPlans?.some((plan) => plan.monthlyPlanId === monthDb?.id)
      )

      return filteredBudgets.length > 0
        ? { ...category, budgets: filteredBudgets }
        : null
    })
    .filter(Boolean)

  const genericBudgets = budgets?.categories
    .map((category) => {
      const filteredBudgets = category.budgets.filter(
        (budget) =>
          budget.monthlyPlans.length === 0 ||
          budget.monthlyPlans?.some(
            (plan) => plan.monthlyPlanId !== monthDb?.id
          )
      )

      return filteredBudgets.length > 0
        ? { ...category, budgets: filteredBudgets }
        : null
    })
    .filter(Boolean)

  async function handleAddToMonthly(categoryName: string, budget: Budget) {
    try {
      await addBudgetForMonth({
        email: email,
        budget,
        month: month as string,
      })
      queryClient.invalidateQueries({ queryKey: ["budgets"] })
      toast.success("Enveloppe ajouté au mois", {
        duration: 1500,
        className: "text-primary",
      })
    } catch (error) {
      console.error("Erreur d'ajout:", error)
      toast.error("Impossible d'ajouter l'enveloppe", {
        duration: 1500,
        className: "text-red-500",
      })
    }
  }

  async function removeToMonthly(budget: Budget) {
    if (!monthDb) return
    try {
      await removeBudgetForMonth({
        budgetId: budget.id,
        monthId: monthDb.id,
      })
      queryClient.invalidateQueries({ queryKey: ["budgets"] })
      toast.success("Enveloppe retiré du mois", {
        duration: 1500,
        className: "text-primary",
      })
    } catch (error) {
      console.error("Erreur d'ajout:", error)
      toast.error("Impossible d'ajouter ce budget", {
        duration: 1500,
        className: "text-red-500",
      })
    }
  }

  const renderMonthlyBudgets = (category: Category) => (
    <Card key={category.id} className='w-full mb-4 bg-green-100'>
      <CardHeader>
        <CardTitle>{category.name}</CardTitle>
      </CardHeader>
      <CardContent className='flex gap-2'>
        {category.budgets.map((budget) => (
          <Card
            key={budget.id}
            className='flex justify-around items-center p-2 w-1/2 h-20 cursor-pointer hover:bg-green-200 transition-all duration-300 ease-in-out shadow-xl'
          >
            <div className='flex justify-between w-3/4'>
              <span>{budget.name}</span>
              <span>{budget.amount}€</span>
            </div>
            <Trash
              className='w-4 h-4 text-red-600 cursor-pointer hover:text-red-800 transition-all duration-300 ease-in-out hover:scale-110'
              onClick={() => removeToMonthly(budget)}
            />
          </Card>
        ))}
      </CardContent>
    </Card>
  )

  const renderGenericBudgets = (category: Category) => (
    <Card key={category.id} className='w-full mb-4'>
      <CardHeader>
        <CardTitle>{category.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Budget</TableHead>
              <TableHead className='text-right'>Montant</TableHead>
              <TableHead className='text-right'>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {category.budgets.map((budget) => (
              <TableRow key={budget.id}>
                <TableCell>{budget.name}</TableCell>
                <TableCell className='text-right'>{budget.amount}€</TableCell>
                <TableCell className='text-right'>
                  <Button
                    onClick={() => handleAddToMonthly(category.name, budget)}
                  >
                    Ajouter
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )

  if (isLoading) {
    return (
      <div className='flex flex-1 justify-center items-center'>
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <div className='flex flex-1 flex-col w-full max-w-4xl mx-auto p-4'>
      <h1 className='text-3xl w-full text-center font-title text-primary mb-10'>{`Mes enveloppes de ${month
        ?.toString()
        .toUpperCase()}`}</h1>
      {budgetsForMonth?.map((category) =>
        renderMonthlyBudgets(category as Category)
      )}

      <h2 className='text-2xl mt-10 mb-4 w-full text-center font-title text-primary'>
        Mes budgets génériques
      </h2>
      {genericBudgets?.map((category) =>
        renderGenericBudgets(category as Category)
      )}
    </div>
  )
}
