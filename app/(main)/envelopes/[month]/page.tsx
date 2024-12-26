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
import { Trash, CircleChevronRight, CircleChevronLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"

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

const months = [
  "janvier",
  "fevrier",
  "mars",
  "avril",
  "mai",
  "juin",
  "juillet",
  "aout",
  "septembre",
  "octobre",
  "novembre",
  "decembre",
]

export default function MonthlyBudgetPage() {
  const { user } = useUser()
  const { month } = useParams()
  const queryClient = useQueryClient()
  const router = useRouter()
  const email = user?.emailAddresses[0].emailAddress || ""
  const { data: budgets, isLoading } = useBudgets(email)
  const { data: monthPlan } = useMonth(email, month as string)

  const currentMonthIndex = months.indexOf(month as string)
  const nextMonth = months[(currentMonthIndex + 1) % 12]
  const prevMonth = months[(currentMonthIndex - 1 + 12) % 12]

  const handleCalendarClick = () => {
    toast.info("Fonctionnalité du mini-calendrier à implémenter")
  }
  const budgetsForMonth = budgets?.categories
    .map((category) => {
      const filteredBudgets = category.budgets.filter(
        (budget) => budget.monthlyPlanId === monthPlan?.id
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
          (budget.monthlyPlans.length === 0 ||
            budget.monthlyPlans?.every(
              (plan) => plan.monthlyPlanId !== monthPlan?.id
            )) &&
          !budget.monthlyPlanId
      )

      return filteredBudgets.length > 0
        ? { ...category, budgets: filteredBudgets }
        : null
    })
    .filter(Boolean)
  async function handleAddToMonthly(budget: Budget) {
    try {
      await addBudgetForMonth({
        email: email,
        budget,
        month: month as string,
        pathToRevalidate: `/envelopes/${month}`,
      })
      queryClient.invalidateQueries({ queryKey: ["budgets"] })
      toast.success("Enveloppe ajouté au mois", {
        duration: 1500,
        className: "text-primary",
      })
      router.refresh()
    } catch (error) {
      console.error("Erreur d'ajout:", error)
      toast.error("Impossible d'ajouter l'enveloppe", {
        duration: 1500,
        className: "text-red-500",
      })
    }
  }

  async function removeToMonthly(budget: Budget) {
    if (!monthPlan) return
    try {
      await removeBudgetForMonth({
        budgetId: budget.id,
        monthId: monthPlan.id,
      })
      queryClient.invalidateQueries({ queryKey: ["budgets"] })
      toast.success("Enveloppe retiré du mois", {
        duration: 1500,
        className: "text-primary",
      })
      router.refresh()
    } catch (error) {
      console.error("Erreur d'ajout:", error)
      toast.error("Impossible d'ajouter ce budget", {
        duration: 1500,
        className: "text-red-500",
      })
    }
  }

  const renderMonthlyBudgets = (category: Category) => (
    <Card
      key={category.id}
      className='w-full md:w-2/3 mb-4 bg-primary text-slate-50 font-sans p-0 mx-auto'
    >
      <CardHeader>
        <CardTitle className='text-xl text-center'>{category.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
          {category.budgets.map((budget) => (
            <Card
              key={budget.id}
              className='flex justify-around items-center mx-auto w-full md-w-2/3 sm:w-full p-2 py-4 h-20 cursor-pointer transition-all duration-300 ease-in-out shadow-xl  hover:scale-105 hover:text-green-800'
            >
              <Link
                href={`/envelopes/${month}/budget/${budget.id}`}
                className='w-3/4 h-full items-center flex justify-around'
              >
                <div className='flex justify-around  w-3/4 text-sm md:text-base flex-col md:flex-row'>
                  <span>{budget.name}</span>
                  <span>{budget.amount}€</span>
                </div>
              </Link>
              <Trash
                className='w-4 h-4 text-red-600 cursor-pointer hover:text-red-800 transition-all duration-300 ease-in-out hover:scale-110'
                onClick={() => removeToMonthly(budget)}
              />
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )

  const renderGenericBudgets = (category: Category) => (
    <Card
      key={category.id}
      className='w-full md:w-2/3 mb-4 bg-primary text-slate-50 font-sans p-0 mx-auto'
    >
      <CardHeader>
        <CardTitle className='text-xl text-center font-title'>
          {category.name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='text-slate-50'>Budget</TableHead>
              <TableHead className='text-right text-slate-50'>
                Montant
              </TableHead>
              <TableHead className='text-right text-slate-50'>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {category.budgets.map((budget) => (
              <TableRow key={budget.id}>
                <TableCell>{budget.name}</TableCell>
                <TableCell className='text-right'>{budget.amount}€</TableCell>
                <TableCell className='text-right'>
                  <Button
                    className='text-primary bg-slate-50 hover:bg-slate-50/90 hover:scale-110 transition-all duration-300 ease-in-out font-sans'
                    onClick={() => handleAddToMonthly(budget)}
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
      <div className='flex justify-around items-center mb-20'>
        <Button
          className='text-slate-50 bg-primary hover:bg-primary/90 hover:scale-110 transition-all duration-300 ease-in-out'
          onClick={() => router.push(`/envelopes/${prevMonth}`)}
        >
          <CircleChevronLeft />
        </Button>
        <Button
          className='text-slate-50 bg-primary'
          onClick={handleCalendarClick}
        >
          📅 Choisir un mois
        </Button>
        <Button
          className='text-slate-50 bg-primary hover:bg-primary/90 hover:scale-110 transition-all duration-300 ease-in-out'
          onClick={() => router.push(`/envelopes/${nextMonth}`)}
        >
          <CircleChevronRight />
        </Button>
      </div>
      <h1 className='text-2xl w-full text-center font-title text-slate-50 mb-10'>{`Enveloppes ${month
        ?.toString()
        .toUpperCase()}`}</h1>
      {budgetsForMonth?.length === 0 ? (
        <p className='text-center text-slate-50 font-sans'>
          Aucune enveloppe pour ce mois-ci
        </p>
      ) : (
        budgetsForMonth?.map((category) =>
          renderMonthlyBudgets(category as Category)
        )
      )}

      <h2 className='text-xl my-10 mb-8 w-full text-center font-title text-slate-50'>
        Enveloppes génériques
      </h2>
      {genericBudgets?.length === 0 ? (
        <p className='text-center text-slate-50 font-sans'>
          Aucune enveloppe générique pour ce mois-ci
        </p>
      ) : (
        genericBudgets?.map((category) =>
          renderGenericBudgets(category as Category)
        )
      )}
    </div>
  )
}
