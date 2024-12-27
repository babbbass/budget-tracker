import React, { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { EditBudgetForm } from "@/components/form/EditBudgetForm"
import { FilePenLine } from "lucide-react"

export function EditBudgetDialog({
  budget,
}: {
  budget: {
    id: string
    name: string
    amount: number
  }
}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <FilePenLine className='w-4 h-4 text-primary mr-2 cursor-pointer hover:scale-125 transition-all duration-300 ease-in-out hover:text-primary/90' />
      </DialogTrigger>
      <DialogContent className='bg-emerald-900 text-slate-50 border-0 shadow-2xl'>
        <DialogHeader>
          <DialogTitle className='text-2xl font-bold text-center mb-6'>
            {`Modifier l'envellope`}
          </DialogTitle>
        </DialogHeader>

        <EditBudgetForm budget={budget} isOpen={setIsOpen} />
      </DialogContent>
    </Dialog>
  )
}
