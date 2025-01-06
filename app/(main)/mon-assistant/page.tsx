import React from "react"
import { BudgetAssistant } from "@/components/BudgetAssistant"
import { getUserFromDB } from "@/lib/actionsUser"
import { redirect } from "next/navigation"

export default async function MonAssistant() {
  const user = await getUserFromDB()

  if (!user) {
    redirect("/connexion")
  }
  return (
    <div className='flex flex-col justify-start items-center w-full bg-base-200/35 p-5 rounded-xl flex-1 md:w-2/3'>
      <h1 className='text-2xl md:text-3xl font-title'>
        Mon Assistant Budgétaire Intelligent
      </h1>
      <p className='font-sans mb-10 mt-10 w-full md:w-3/4'>
        Bienvenue dans votre assistant budgétaire personnalisé. Posez vos
        questions, explorez vos finances, et obtenez des réponses intelligentes
        et rapides pour mieux gérer vos dépenses, vos économies et vos objectifs
        financiers. Votre gestion simplifiée commence ici !
      </p>
      <BudgetAssistant userId={user.id} />
    </div>
  )
}
