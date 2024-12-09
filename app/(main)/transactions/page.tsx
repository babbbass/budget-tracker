"use client"

import { BudgetType } from "@/types"
import { useUser } from "@clerk/nextjs"
import React, { useEffect, useState } from "react"
import { getTransactionsByUser } from "@/lib/actionsTransaction"
import { TransactionCard } from "@/components/TransactionCard"
import Link from "next/link"

export default function Page() {
  const { user } = useUser()
  const [budget, setTransactions] = useState<BudgetType[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const email = user?.primaryEmailAddress?.emailAddress

  const fetchTransactions = async (period: string) => {
    if (email) {
      setLoading(true)
      try {
        const transactionsData = await getTransactionsByUser(email, period)
        //@ts-expect-error "error type unknown"
        setTransactions(transactionsData)
        setLoading(false)
      } catch (err) {
        console.error("Erreur lors de la récupération des transactions: ", err)
      }
    }
  }

  useEffect(() => {
    fetchTransactions("last30")
  }, [email])

  return (
    <>
      {/* <div className='flex justify-end mb-5 '>
        <select
          className='input input-bordered input-md'
          defaultValue='last30'
          onChange={(e) => fetchTransactions(e.target.value)}
        >
          <option value='last7'>Derniers 7 jours</option>
          <option value='last30'>Derniers 30 jours</option>
          <option value='last90'>Derniers 90 jours</option>
          <option value='last365'>Derniers 365 jours</option>
        </select>
      </div> */}

      <div className='flex justify-center w-full bg-base-200/35 p-5 rounded-xl'>
        {loading ? (
          <div className='flex justify-center items-center'>
            <span className='loading loading-spinner loading-md'></span>
          </div>
        ) : budget.length === 0 ? (
          <div className='flex justify-center items-center h-full'>
            <span className='text-gray-500 text-sm'>
              Aucune transaction à afficher.
            </span>
          </div>
        ) : (
          <div className='flex flex-col gap-4 justify-center w-3/4 items-center'>
            {budget.map((budget) =>
              budget.transactions?.map((transaction) => (
                <Link
                  href={`/budgets/${budget.id}`}
                  key={transaction.id}
                  className='w-full'
                >
                  <TransactionCard
                    transaction={transaction}
                    budget={budget.name}
                  />
                </Link>
              ))
            )}
          </div>
        )}
      </div>
    </>
  )
}
