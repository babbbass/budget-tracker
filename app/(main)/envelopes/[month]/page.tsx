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
// import { useBudgetsGenericForMonth } from "@/hooks/useBudgets"
// import { useBudgetsForMonth } from "@/hooks/useMonths"
import { useQueryClient } from "@tanstack/react-query"
import {
  Trash,
  CircleChevronRight,
  CircleChevronLeft,
  Mails,
  EyeIcon,
  CalendarPlus,
} from "lucide-react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { MonthsEnum as Months } from "@/types"
import { useBudgetForMonth } from "@/hooks/useBudgetForMonth"

type BudgetByMonth = {
  id: string
  name: string
  amount: number
  category: Category
  transactions: { amount: number; id: string; name: string }[]
}[]

type Budget = {
  id: string
  name: string
  amount: number
  category: Category
  monthlyPlanId: string
  transactions: { amount: number; id: string; name: string }[]
}

type Category = {
  id: string
  name: string
  userId?: string
}

export default function MonthlyBudgetPage() {
  const { user } = useUser()
  const { month } = useParams()
  const pathname = usePathname()
  const queryClient = useQueryClient()
  const router = useRouter()
  const email = user?.emailAddresses[0].emailAddress || ""
  const { data, isLoading } = useBudgetForMonth(email, month as string)
  const currentMonth = Object.keys(Months).find(
    (key) => month?.toString().toUpperCase() === key
  )
  if (!currentMonth) {
    return (
      <div className='flex flex-1 justify-center items-center w-full md:w-2/3 p-2 flex-col gap-4'>
        Page introuvable
      </div>
    )
  }

  const months = Object.keys(Months).filter((key) => isNaN(Number(key)))
  const currentMonthIndex = months.indexOf(currentMonth as string)
  const nextMonth = months[(currentMonthIndex + 1) % 12]
  const prevMonth = months[(currentMonthIndex - 1 + 12) % 12]

  // const handleCalendarClick = () => {
  //   toast.info("Fonctionnalité du mini-calendrier à implémenter")
  // }

  function groupByCategory(items: BudgetByMonth) {
    return items.reduce((acc: Record<string, BudgetByMonth>, item) => {
      const categoryId = item.category.id

      if (!acc[categoryId]) {
        acc[categoryId] = []
      }
      acc[categoryId].push(item)
      return acc
    }, {})
  }

  const budgetsByCategory =
    data?.budgetsForMonth && groupByCategory(data.budgetsForMonth)

  /* @ts-expect-error "error type unknown" */
  const genericBudgets = data?.budgets && groupByCategory(data.budgets)

  async function handleAddToMonthly(budget: {
    id: string
    name: string
    amount: number
    category: Category
  }) {
    try {
      await addBudgetForMonth({
        email: email,
        budget,
        month: month as string,
        pathToRevalidate: pathname,
      })
      queryClient.invalidateQueries({ queryKey: ["budgetsGenericForMonth"] })
      queryClient.invalidateQueries({ queryKey: ["month"] })
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

  async function removeToMonthly(budget: {
    id: string
    name: string
    monthlyPlanId?: string
    category: Category
  }) {
    if (!data?.budgetsForMonth) return
    try {
      await removeBudgetForMonth({
        budgetId: budget.id,
        budgetName: budget.name,
        monthlyPlanId: budget.monthlyPlanId as string,
        pathToRevalidate: pathname,
      })
      queryClient.invalidateQueries({ queryKey: ["budgetsGenericForMonth"] })
      queryClient.invalidateQueries({ queryKey: ["month"] })
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

  function totalAmountTransactions(
    budgets: { amount: number; id: string; name: string }[]
  ) {
    return budgets.reduce((total, budget) => total + budget.amount, 0)
  }

  const renderMonthlyBudgets = (category: BudgetByMonth) => (
    <Card
      key={category[0].category.id}
      className='w-4/5 md:w-2/3 mb-4 bg-primary text-slate-50 font-sans p-0 mx-auto'
    >
      <CardHeader>
        <CardTitle className='text-xl text-center'>
          {category[0].category.name}
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
            {category.map((budget) => (
              <TableRow
                key={budget.id}
                className='font-sans hover:bg-transparent hover:text-slate-100 transition-all duration-300 ease-in-out'
              >
                <TableCell>{budget.name}</TableCell>
                <TableCell className='text-right'>
                  {budget.amount -
                    totalAmountTransactions(budget?.transactions)}
                  €
                </TableCell>
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

  const renderGenericBudgets = (category: BudgetByMonth) => (
    <Card
      key={category[0].id}
      className='w-4/5 md:w-2/3 mb-4 bg-primary text-slate-50 font-sans p-0 mx-auto'
    >
      <CardHeader>
        <CardTitle className='text-xl text-center font-title'>
          {category[0].category.name}
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
            {category.map((budget) => (
              <TableRow
                key={budget.id}
                className='font-sans hover:bg-transparent hover:text-slate-100 transition-all duration-300 ease-in-out'
              >
                <TableCell>{budget.name}</TableCell>
                <TableCell className='text-right'>{budget.amount}€</TableCell>
                <TableCell className='text-right'>
                  <Button
                    className='text-slate-100 cursor-pointer hover:scale-125 transition-all duration-300 ease-in-out font-sans'
                    onClick={() => handleAddToMonthly(budget)}
                  >
                    <CalendarPlus className='w-5 h-5' />
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
          <h1 className='text-2xl font-title text-slate-50'>{`Enveloppes ${currentMonth}`}</h1>
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
            <h1 className='text-2xl font-title text-slate-50'>{`Enveloppes ${currentMonth}`}</h1>
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

      {data?.budgetsForMonth?.length === 0 ? (
        <p className='text-center text-slate-50 font-sans'>
          Aucune enveloppe pour ce mois-ci
        </p>
      ) : (
        budgetsByCategory &&
        Object.values(budgetsByCategory).map((items) =>
          renderMonthlyBudgets(items as Budget[])
        )
      )}

      <h2 className='text-xl my-10 mb-8 w-full text-center font-title text-slate-50'>
        Enveloppes génériques
      </h2>
      {data?.budgets.length === 0 ? (
        <p className='text-center text-slate-50 font-sans'>
          Aucune enveloppe générique pour ce mois-ci
        </p>
      ) : (
        genericBudgets &&
        Object.values(genericBudgets).map((category) =>
          renderGenericBudgets(category)
        )
      )}
    </div>
  )
}
