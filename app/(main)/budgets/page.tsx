import React from "react"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { MonthSelector } from "@/components/MonthSelector"

export default async function BudgetPage() {
  const user = await currentUser()
  if (!user) {
    redirect("/connexion")
  }

  return (
    <div className='flex flex-1 flex-col w-full md:w-1/2 gap-10 px-2'>
      <MonthSelector />
    </div>
  )
}
