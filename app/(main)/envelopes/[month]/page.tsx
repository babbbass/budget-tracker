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
import {
  Trash,
  CircleChevronRight,
  CircleChevronLeft,
  Mails,
  EyeIcon,
} from "lucide-react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { months } from "@/lib/utils/constants"

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
  const pathname = usePathname()
  const queryClient = useQueryClient()
  const router = useRouter()
  const email = user?.emailAddresses[0].emailAddress || ""
  const { data: budgets, isLoading } = useBudgets(email)
  const { data: monthPlan } = useMonth(email, month as string)

  const currentMonthIndex = months.indexOf(month as string)
  const nextMonth = months[(currentMonthIndex + 1) % 12]
  const prevMonth = months[(currentMonthIndex - 1 + 12) % 12]

  // const handleCalendarClick = () => {
  //   toast.info("Fonctionnalité du mini-calendrier à implémenter")
  // }
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
        pathToRevalidate: pathname,
      })
      queryClient.invalidateQueries({ queryKey: ["budgets"] })
      toast.success("Enveloppe ajouté au mois", {
        duration: 1200,
        className: "text-primary",
      })
      router.refresh()
    } catch (error) {
      console.error("Erreur d'ajout:", error)
      toast.error("Impossible d'ajouter l'enveloppe", {
        duration: 1200,
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
        pathToRevalidate: pathname,
      })
      queryClient.invalidateQueries({ queryKey: ["budgets"] })
      toast.success("Enveloppe retiré du mois", {
        duration: 1200,
        className: "text-primary",
      })
      router.refresh()
    } catch (error) {
      console.error("Erreur d'ajout:", error)
      toast.error("Impossible de retirer cette budget", {
        duration: 1200,
        className: "text-red-500",
      })
    }
  }

  const renderMonthlyBudgets = (category: Category) => (
    <Card
      key={category.id}
      className='w-4/5 md:w-2/3 mb-4 bg-primary text-slate-50 font-sans p-0 mx-auto'
    >
      <CardHeader>
        <CardTitle className='text-xl text-center'>{category.name}</CardTitle>
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
              <TableRow
                key={budget.id}
                className='font-sans hover:bg-transparent hover:text-slate-100 transition-all duration-300 ease-in-out'
              >
                <TableCell>{budget.name}</TableCell>
                <TableCell className='text-right'>{budget.amount}€</TableCell>
                <TableCell className='flex justify-end gap-3'>
                  <Link
                    href={`/envelopes/${month}/budget/${budget.id}`}
                    className='cursor-pointer hover:scale-125 transition-all duration-300 ease-in-out'
                  >
                    <EyeIcon className='w-5 h-5' />
                  </Link>
                  <Trash
                    className='w-5 h-5 text-red-600 cursor-pointer hover:text-red-800 transition-all duration-300 ease-in-out hover:scale-125 font-bold'
                    onClick={() => removeToMonthly(budget)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )

  const renderGenericBudgets = (category: Category) => (
    <Card
      key={category.id}
      className='w-4/5 md:w-2/3 mb-4 bg-primary text-slate-50 font-sans p-0 mx-auto'
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
              <TableRow
                key={budget.id}
                className='font-sans hover:bg-transparent hover:text-slate-100 transition-all duration-300 ease-in-out'
              >
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
    <div className='flex flex-1 flex-col w-full max-w-4xl mx-auto p-4 font-sans'>
      <div className='flex md:flex-row flex-col justify-center items-center mb-12 gap-4'>
        <div className='md:hidden flex items-center justify-center gap-3'>
          <Mails className='inline h-8 w-8 text-primary' />
          <h1 className='text-2xl font-title text-slate-50'>{`Enveloppes ${month
            ?.toString()
            .toUpperCase()}`}</h1>
        </div>
        <div className='flex flex-row justify-between md:justify-around w-full'>
          <Button
            className='text-sm md:text-basetext-slate-50 bg-primary hover:bg-primary/90 hover:scale-110 transition-all duration-300 ease-in-out'
            onClick={() => router.push(`/envelopes/${prevMonth}`)}
          >
            <CircleChevronLeft /> {prevMonth}
          </Button>
          <div className='hidden md:flex items-center justify-center gap-3 mb-6'>
            <Mails className='inline h-8 w-8 text-primary' />
            <h1 className='text-2xl font-title text-slate-50'>{`Enveloppe ${month
              ?.toString()
              .toUpperCase()}`}</h1>
          </div>
          {/* <Button
          className='text-slate-50 bg-primary'
          onClick={handleCalendarClick}
        >
          📅 Choisir un mois
        </Button> */}
          <Button
            className='text-sm md:text-base text-slate-50 bg-primary hover:bg-primary/90 hover:scale-110 transition-all duration-300 ease-in-out'
            onClick={() => router.push(`/envelopes/${nextMonth}`)}
          >
            {nextMonth} <CircleChevronRight />
          </Button>
        </div>
      </div>

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
