import React from "react"
import { currentUser } from "@clerk/nextjs/server"
import { AddBudgetForm } from "@/components/form/addBudgetForm"
import { redirect } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { findAllBudget } from "@/lib/actionsBudget"
import { BudgetsTable } from "@/components/BudgetsTable"

export default async function BudgetPage() {
  const user = await currentUser()
  if (!user) {
    redirect("/connexion")
  }
  const email = user?.emailAddresses[0].emailAddress
  const budgets = await findAllBudget(email)
  return (
    <>
      <BudgetsTable categoriesData={budgets?.categories} />
      <Dialog>
        <DialogTrigger>Ajoutez un nouveau budget</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className='text-center text-2xl'>
              Nouveau budget
            </DialogTitle>
            <DialogDescription className='text-center my-4'>
              Ajoutez ici votre nouveau budget
            </DialogDescription>
          </DialogHeader>
          <AddBudgetForm emailUser={email} />
        </DialogContent>
      </Dialog>
    </>
  )
}
