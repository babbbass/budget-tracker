import React, { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { BudgetType } from "@/types"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { costTotalTransactions } from "@/lib/calculations"
import { deleteBudgetById } from "@/lib/actionsBudget"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export function BudgetCard({ budget }: { budget: BudgetType }) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)

  async function deleteMyBudget(budgetId: string) {
    if (!budgetId) {
      toast.error("Enveloppe introuvable.", {
        duration: 1500,
        className: "text-red-500",
      })
      return
    }
    setIsDeleting(true)
    try {
      console.log(budgetId)

      const response = await deleteBudgetById(budgetId)
      if (response) {
        toast.success("Enveloppe supprimée !", {
          duration: 1500,
          className: "text-green-500",
        })
        router.push("/budgets")
      }
    } catch (error) {
      console.error("Erreur lors de la suppression de l'enveloppe:", error)
      toast.error("Une erreur est survenue veuillez réessayer", {
        duration: 1500,
        className: "text-red-500",
      })
    } finally {
      setIsDeleting(false) // Désactive le chargement
    }
  }
  const totalTransactionAmount = costTotalTransactions(
    budget?.transactions || []
  )
  const progressValue =
    totalTransactionAmount > budget.amount
      ? 100
      : (totalTransactionAmount / budget.amount) * 100

  const amountRemaining = budget?.amount - totalTransactionAmount
  return (
    <Card className='w-full'>
      <CardHeader className='flex flex-row justify-between items-center border-b py-1 mb-4'>
        <div>
          <h2 className='italic font-title text-2xl '>{budget?.name}</h2>
          <span className='font-sans text-sm'>
            {budget?.transactions?.length} transaction(s)
          </span>
        </div>
        <span className='font-sans text-emerald-600'>{budget?.amount}€</span>
      </CardHeader>
      <CardContent className='flex flex-col gap-2'>
        <div className='flex justify-between'>
          <span className='font-sans text-sm '>
            {totalTransactionAmount}€{" "}
            {budget.category?.name === "Épargnes" ? "épargnés" : "dépensés"}
          </span>
          <span className='font-sans text-sm'>{amountRemaining}€ restants</span>
        </div>
        <span className='mt-4'>
          <Progress value={progressValue} indicatorColor='bg-emerald-600' />
        </span>
        <Button
          className='mt-4 bg-primary text-white font-sans hover:bg-primary/90 transition-all'
          onClick={async () => {
            await deleteMyBudget(budget.id)
          }}
          disabled={isDeleting}
        >
          {isDeleting ? (
            "Suppression..."
          ) : (
            <>
              <Trash2 /> Supprimer
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}
