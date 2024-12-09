"use client"
import React from "react"
import { BudgetType } from "@/types"
import { useRouter } from "next/navigation"
import { totalAmount } from "@/lib/calculations"

type SavingBudgetsProps = {
  budgets: BudgetType[]
}
function formatDate(date) {
  return new Date(date).toLocaleDateString("fr-FR")
}

function calculerEpargneMensuelle(item) {
  const dureeEnMois =
    (item.endDate - item.startDate) / (1000 * 60 * 60 * 24 * 30)
  return (item.amount / dureeEnMois).toFixed(2)
}

export function SavingBudgets({ budgets }: SavingBudgetsProps) {
  const router = useRouter()
  return (
    <div className='w-full overflow-x-auto'>
      <h3 className='font-title text-2xl text-center w-full mb-0 bg-primary text-white py-4'>
        Épargne
      </h3>
      <table className='min-w-full bg-white'>
        <thead className='bg-gray-100'>
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
            {/* <th className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wide'>
              À épargner par mois
            </th> */}
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
              className='cursor-pointer hover:bg-emerald-100'
            >
              <td className='px-6 py-4 whitespace-nowrap text-center font-sans'>
                {budget.name}
              </td>
              <td className='px-6 py-4 whitespace-nowrap text-center font-sans'>
                {budget.amount} €
              </td>
              <td className='px-6 py-4 whitespace-nowrap text-center font-sans'>
                {formatDate(budget.startDate)}
              </td>
              <td className='px-6 py-4 whitespace-nowrap text-center font-sans'>
                {formatDate(budget.endDate)}
              </td>
              {/* <td className='px-6 py-4 whitespace-nowrap text-center font-sans'>
                {calculerEpargneMensuelle(budget)} €
              </td> */}
              <td className='px-6 py-4 whitespace-nowrap text-center font-sans'>
                {totalAmount(budget.transactions ? budget.transactions : [])} €
              </td>
              <td className='px-6 py-4 whitespace-nowrap text-center font-sans'>
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
  )
}
