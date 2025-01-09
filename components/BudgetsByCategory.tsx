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
}

export function BudgetsByCategory({ budgets }: BudgetsByCategory) {
  const router = useRouter()
  return (
    <div className='w-full md:w-2/3'>
      <div className='overflow-x-auto'>
        <table className='min-w-full bg-primary font-sans text-slate-50'>
          <thead className='bg-emerald-800 hidden md:table-header-group'>
            <tr>
              <th className='px-6 py-3 text-center text-xs font-medium text-slate-50 uppercase tracking-wide'>
                Budgets
              </th>
              <th className='px-6 py-3 text-center text-xs font-medium text-slate-50 uppercase tracking-wide'>
                Montant
              </th>
              <th className='px-6 py-3 text-center text-xs font-medium text-slate-50 uppercase tracking-wide'>
                Nombre de transactions
              </th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200'>
            {budgets.map((budget) => (
              <tr
                key={budget.id}
                onClick={() => router.push(`/budgets/${budget.id}`)}
                className='cursor-pointer hover:bg-emerald-700 flex flex-col md:table-row'
              >
                <td className='px-6 py-4 whitespace-nowrap text-left md:text-center font-sans flex md:table-cell before:content-["Catégorie:"] before:font-bold before:mr-2 md:before:content-none before:w-1/2 '>
                  {budget.name}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-left md:text-center font-sans flex md:table-cell before:content-["Montant:"] before:font-bold before:mr-2 md:before:content-none before:w-1/2'>
                  {budget.amount} €
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-left md:text-center font-sans flex md:table-cell before:content-["Transactions:"] before:font-bold before:mr-2 md:before:content-none before:w-1/2'>
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
