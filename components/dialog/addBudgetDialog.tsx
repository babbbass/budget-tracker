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
  triggerSentence = "Nouvelle enveloppe",
  category,
  className,
}: {
  email: string
  triggerSentence?: string
  category?: {
    id: string
    name: string
  }
  className?: string
}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger
        className={`text-sm cursor-pointer font-semibold rounded-lg text-white p-2 bg-primary hover:bg-primary/90 transition-all duration-300 ease-in-out flex justify-center ${className}`}
      >
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
        <AddBudgetForm
          emailUser={email}
          isOpen={setIsOpen}
          category={category}
        />
      </DialogContent>
    </Dialog>
  )
}
