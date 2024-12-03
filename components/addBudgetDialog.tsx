"use client"
import React, { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { AddBudgetForm } from "@/components/form/addBudgetForm"

export function AddBudgetDialog({
  email,
  triggerSentence = "+ Ajoutez un nouveau budget",
}: {
  email: string
  triggerSentence?: string
}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className=' cursor-pointer font-semibold rounded-xl text-white px-4 py-2 mb-6 bg-emerald-600'>
        {triggerSentence}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='text-center text-2xl'>
            Nouveau budget
          </DialogTitle>
          <DialogDescription className='text-center my-4'>
            Ajoutez ici votre nouveau budget
          </DialogDescription>
        </DialogHeader>
        <AddBudgetForm emailUser={email} isOpen={setIsOpen} />
      </DialogContent>
    </Dialog>
  )
}
