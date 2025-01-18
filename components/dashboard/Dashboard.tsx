import React from "react"
import { addUserToDB } from "@/lib/actionsUser"
import { BudgetCards } from "@/components/dashboard/BudgetCards"
import { CategoryCards } from "@/components/dashboard/CategoryCards"
import { findMainBudgetByUserEmail } from "@/lib/actionsBudget"
import { FirstBudget } from "@/components/FirstBudget"
// import { AddBudgetDialog } from "@/components/dialog/addBudgetDialog"
import { MonthSelector } from "@/components/MonthSelector"
import Link from "next/link"

type Dashboard = {
  userId: string
  fullName: string
  email: string
}

export async function Dashboard({ userId, fullName, email }: Dashboard) {
  const [, budgets] = await Promise.all([
    addUserToDB(userId, fullName, email),
    findMainBudgetByUserEmail(email),
  ])
  if (!budgets) {
    return null
  }
  return (
    <section className='flex flex-1 gap-2 flex-col font-bold w-full px-4 py-2'>
      <section className='flex flex-col gap-4 justify-between items-center md:flex-row'>
        <h1 className='font-title text-slate-200 mb-2 text-left w-full text-lg'>
          Mon tableau de bord
        </h1>
        <div className='flex gap-10 md:gap-2 items-center justify-between text-slate-50 font-sans'>
          <span className='text-sm italic'>
            {new Date().toLocaleDateString("fr-FR")}
          </span>
          {/* <ExportButton budgets={budgets?.categories} /> */}
          {/* <AddBudgetDialog email={email} /> */}

          <Link href='/dashboard/settings'>
            <p className='mx-auto text-sm cursor-pointer font-semibold rounded-xl text-white px-4 py-3 bg-primary hover:bg-primary/90 transition-all duration-300 ease-in-out flex justify-center'>
              Réglages & Configuration
            </p>
          </Link>
        </div>
      </section>
      {budgets && budgets.categories.length === 0 && (
        <FirstBudget email={email} />
      )}
      <div className='flex flex-col items-center gap-3 md:flex-row md:items-start'>
        <div className='md:w-2/3 w-full flex flex-col items-start gap-4'>
          {/* @ts-expect-error "error type unknown */}
          {budgets && <BudgetCards budgets={budgets?.categories} />}
          {/* @ts-expect-error "error type unknown */}
          <CategoryCards categories={budgets?.categories} />
        </div>
        <section className='w-full md:w-1/3 flex justify-start'>
          <MonthSelector />
        </section>
      </div>
    </section>
  )
}
