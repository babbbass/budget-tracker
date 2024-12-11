"use client"
import React, { useEffect } from "react"
import { useParams } from "next/navigation"
import { BudgetsByCategory } from "@/components/BudgetsByCategory"
import { fetchCategoryById } from "@/lib/actionsCategory"
import { LoadingSpinner } from "@/components/LoadingSpinner"
import { ChartColumnStacked } from "lucide-react"

type budgetsByCategory = {
  name: string
  budgets: {
    id: string
    name: string
    amount: number
    transactions: { id: string }[]
  }[]
}
export default function Page() {
  const [category, setCategory] = React.useState<budgetsByCategory | null>(null)

  async function fetchCategories(id: string) {
    try {
      const category = await fetchCategoryById(id)
      setCategory(category)
    } catch (err: unknown) {
      //@ts-expect-error "error type unknown"
      console.log({ error: err.message })
    }
  }

  const { id } = useParams()
  const idCategory = String(id)
  useEffect(() => {
    if (id) {
      fetchCategories(idCategory)
    }
  }, [])

  if (!category) {
    return (
      <div className='flex flex-1 justify-center items-center'>
        <LoadingSpinner />
      </div>
    )
  }
  if (!category) {
    return (
      <div className='flex flex-1 justify-center items-center'>
        <LoadingSpinner />
      </div>
    )
  }
  return (
    <div className='flex flex-1 flex-col w-full items-center gap-10'>
      <h1 className='text-3xl font-title text-primary flex items-center gap-3'>
        <ChartColumnStacked className='inline h-8 w-8 text-gray-800' />
        {category.name}
      </h1>
      <BudgetsByCategory
        budgets={category.budgets}
        categoryName={category.name}
      />
    </div>
  )
}
