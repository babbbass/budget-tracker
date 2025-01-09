"use client"
import React from "react"
import { useParams, useRouter } from "next/navigation"
import { BudgetsByCategory } from "@/components/BudgetsByCategory"
import { fetchCategoryById } from "@/lib/actionsCategory"
import { LoadingSpinner } from "@/components/LoadingSpinner"
import { ChartColumnStacked } from "lucide-react"
import { BackNavigation } from "@/components/navigation/BackNavigation"
import { useQuery } from "@tanstack/react-query"
import { Error } from "@/components/Error"

export default function Page() {
  const router = useRouter()
  const { id } = useParams()
  const idCategory = String(id)

  const {
    data: category,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: () => fetchCategoryById(idCategory),
  })

  if (isLoading) {
    return (
      <div className='flex flex-1 justify-center items-center'>
        <LoadingSpinner />
      </div>
    )
  }

  if (error) {
    return <Error />
  }

  return (
    <div className='flex flex-1 flex-col w-full items-center px-4'>
      <BackNavigation router={router} />
      <h1 className='text-2xl md:text-3xl font-title text-slate-50 flex items-center gap-3 mb-4'>
        <ChartColumnStacked className='inline h-8 w-8 text-primary' />
        {category?.name}
      </h1>
      {category && <BudgetsByCategory budgets={category.budgets} />}
    </div>
  )
}
