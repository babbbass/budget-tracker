"use client"
import React from "react"
import { useRouter } from "next/navigation"

type BudgetsByCategory = {
  budgets: {
    name: string
    amount: number
    id: string
    transactions: { id: string }[]
  }[]
  categoryName: string
}

export function BudgetsByCategory({
  budgets,
  categoryName,
}: BudgetsByCategory) {
  const router = useRouter()
  return (
    <div className='w-full'>
      <h3 className='font-title text-2xl text-center w-full mb-0 bg-primary text-white py-4'>
        {categoryName}
      </h3>
      <div className='overflow-x-auto'>
        <table className='min-w-full bg-white'>
          <thead className='bg-gray-100 hidden md:table-header-group'>
            <tr>
              <th className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wide'>
                Budgets
              </th>
              <th className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wide'>
                Montant
              </th>
              <th className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wide'>
                Nombre de transactions
              </th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200'>
            {budgets.map((budget) => (
              <tr
                key={budget.id}
                onClick={() => router.push(`/budgets/${budget.id}`)}
                className='cursor-pointer hover:bg-emerald-100 flex flex-col md:table-row'
              >
                <td className='px-6 py-4 whitespace-nowrap text-left md:text-center font-sans flex md:table-cell before:content-["Catégorie:"] before:font-bold before:mr-2 md:before:content-none before:w-1/2 '>
                  {budget.name}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-left md:text-center font-sans flex md:table-cell before:content-["Objectif:"] before:font-bold before:mr-2 md:before:content-none before:w-1/2'>
                  {budget.amount} €
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-left md:text-center font-sans flex md:table-cell before:content-["Montant_épargné:"] before:font-bold before:mr-2 md:before:content-none before:w-1/2'>
                  {budget.transactions.length}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
