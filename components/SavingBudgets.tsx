"use client"
import React from "react"
import { BudgetType } from "@/types"
import { useRouter } from "next/navigation"
import { totalAmount } from "@/lib/calculations"

type SavingBudgetsProps = {
  budgets: BudgetType[]
}
function formatDate(date: Date) {
  return new Date(date).toLocaleDateString("fr-FR")
}

export function SavingBudgets({ budgets }: SavingBudgetsProps) {
  const router = useRouter()
  return (
    <div className='w-full'>
      <h3 className='font-title text-2xl text-center w-full mb-0 bg-primary text-white py-4'>
        Épargne
      </h3>
      <div className='overflow-x-auto'>
        <table className='min-w-full bg-white'>
          <thead className='bg-gray-100 hidden md:table-header-group'>
            <tr>
              <th className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wide'>
                Catégorie
              </th>
              <th className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wide'>
                Objectif
              </th>
              <th className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wide'>
                Date début
              </th>
              <th className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wide'>
                Date fin
              </th>
              <th className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wide'>
                Montant épargné
              </th>
              <th className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wide'>
                Reste à faire
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
                <td className='px-6 py-4 whitespace-nowrap text-left md:text-center font-sans flex md:table-cell before:content-["Date_début:"] before:font-bold before:mr-2 md:before:content-none before:w-1/2'>
                  {budget.startDate ? formatDate(budget.startDate) : ""}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-left md:text-center font-sans flex md:table-cell before:content-["Date_fin:"] before:font-bold before:mr-2 md:before:content-none before:w-1/2'>
                  {budget.endDate ? formatDate(budget.endDate) : ""}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-left md:text-center font-sans flex md:table-cell before:content-["Montant_épargné:"] before:font-bold before:mr-2 md:before:content-none before:w-1/2'>
                  {totalAmount(budget.transactions ? budget.transactions : [])}{" "}
                  €
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-left md:text-center font-sans flex md:table-cell before:content-["Reste_à_faire:"] before:font-bold before:mr-2 md:before:content-none before:w-1/2'>
                  {budget.amount -
                    totalAmount(
                      budget.transactions ? budget.transactions : []
                    )}{" "}
                  €
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
