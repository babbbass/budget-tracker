"use client"

import { TransactionType } from "@/types"
import { useUser } from "@clerk/nextjs"
import React, { useEffect, useState } from "react"
import { getTransactionsByUser } from "@/lib/actionsTransaction"
import { TransactionCard } from "@/components/TransactionCard"

export default function Page() {
  const { user } = useUser()
  const [transactions, setTransactions] = useState<TransactionType[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const fetchTransactions = async (period: string) => {
    if (user?.primaryEmailAddress?.emailAddress) {
      setLoading(true)
      try {
        const transactionsData = await getTransactionsByUser(
          user?.primaryEmailAddress?.emailAddress,
          period
        )
        setTransactions(transactionsData)
        setLoading(false)
      } catch (err) {
        console.error("Erreur lors de la récupération des transactions: ", err)
      }
    }
  }

  useEffect(() => {
    fetchTransactions("last30")
  }, [user?.primaryEmailAddress?.emailAddress])

  return (
    <>
      <div className='flex justify-end mb-5 '>
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
      </div>

      <div className='flex justify-center w-full bg-base-200/35 p-5 rounded-xl'>
        {loading ? (
          <div className='flex justify-center items-center'>
            <span className='loading loading-spinner loading-md'></span>
          </div>
        ) : transactions.length === 0 ? (
          <div className='flex justify-center items-center h-full'>
            <span className='text-gray-500 text-sm'>
              Aucune transaction à afficher.
            </span>
          </div>
        ) : (
          <div className='flex flex-col gap-4 justify-center w-3/4 items-center'>
            {transactions.map((transaction) =>
              transaction.transactions.map((transact) => (
                <TransactionCard
                  transaction={transact}
                  key={transact.id}
                  category={transaction.budgetName}
                  budget={transaction.name}
                />
              ))
            )}
          </div>
        )}
      </div>
    </>
  )
}
