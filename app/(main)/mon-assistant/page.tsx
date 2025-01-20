import React from "react"
import { BudgetAssistant } from "@/components/BudgetAssistant"
import { getUserFromDB } from "@/lib/actionsUser"
import { redirect } from "next/navigation"
import Link from "next/link"

export default async function MonAssistant() {
  const user = await getUserFromDB()

  if (!user) {
    redirect("/connexion")
  }
  return (
    <div className='flex flex-col justify-start items-center w-full bg-base-200/35 p-5 rounded-xl flex-1 md:w-2/3 text-slate-50 font-sans'>
      <h1 className='text-2xl md:text-3xl font-title'>
        Mon Assistant Budgétaire Intelligent
      </h1>
      <p className='font-sans mb-10 mt-10 w-full md:w-3/4 md:text-lg'>
        Bienvenue dans votre assistant budgétaire personnalisé. Posez vos
        questions, explorez vos finances, et obtenez des réponses intelligentes
        et rapides pour mieux gérer vos dépenses, vos économies et vos objectifs
        financiers. Votre gestion simplifiée commence ici !
      </p>
      <BudgetAssistant userId={user.id} />
      <div className='flex w-full md:w-3/4 mt-20'>
        <Link
          href='/dashboard/settings'
          className='bg-slate-50 text-primary px-6 py-3 rounded-lg hover:bg-slate-50 transition-all duration-200 ease-in-out flex items-center gap-2 font-sans text-sm md:text-base'
        >
          + Nouvelle enveloppe
        </Link>
      </div>
    </div>
  )
}
