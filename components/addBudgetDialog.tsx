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
  triggerSentence = "+ Créez une nouvelle enveloppe",
}: {
  email: string
  triggerSentence?: string
}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className='text-sm cursor-pointer font-semibold rounded-xl text-white px-4 py-2 bg-primary hover:bg-primary/90 transition-all duration-300 ease-in-out mb-10'>
        {triggerSentence}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='text-center text-2xl text-emerald-600'>
            Nouvelle enveloppe
          </DialogTitle>
          <DialogDescription className='text-center my-4 font-semibold'>
            Créez et atteignez vos objectifs
          </DialogDescription>
        </DialogHeader>
        <AddBudgetForm emailUser={email} isOpen={setIsOpen} />
      </DialogContent>
    </Dialog>
  )
}
