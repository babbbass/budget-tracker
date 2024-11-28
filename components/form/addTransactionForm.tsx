"use client"
import React from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { toast } from "sonner"
import { useBudgetStore } from "@/stores/budget.store"

const formSchema = z.object({
  nameTransaction: z
    .string()
    .min(1, "Le nom de la transaction est obligatoire."),
  amount: z.coerce
    .number({ invalid_type_error: "Le montant doit être un nombre." })
    .positive("Le montant doit être supérieur à 0."),
})

export function AddTransactionForm({
  budget,
  isOpen,
}: {
  budget: { budgetId: string; budgetName: string }
  isOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const { addTransaction, fetchBudgets } = useBudgetStore()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log("Données soumises :", data)
    const { nameTransaction, amount } = data
    const response = await addTransaction(
      budget.budgetId,
      amount,
      nameTransaction
    )
    await fetchBudgets(budget.budgetId)
    // const response = "ok"
    if (response) {
      toast.success("Nouvelle Transaction ajouté !", {
        duration: 1500,
        className: "text-green-500",
      })
      setTimeout(() => {
        isOpen(false)
      }, 2000)
    } else {
      toast.error("Une erreur est survenue veuillez réessayer", {
        duration: 1500,
        className: "text-red-500",
      })
    }
  }

  return (
    <>
      <h3 className='text-center'>
        Ajoutez une transaction pour le budget{" "}
        <span className='text-lg font-semibold'>
          {budget.budgetName.toUpperCase()}
        </span>
      </h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <FormField
            control={form.control}
            name='nameTransaction'
            render={({ field }) => (
              <FormItem>
                <FormLabel>nom transaction</FormLabel>
                <Input placeholder='Ex: Fitness Park...' {...field} />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='amount'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Montant</FormLabel>
                <FormControl>
                  <Input placeholder='Votre montant' {...field} type='number' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type='submit' className='w-full'>
            Ajoutez la transaction
          </Button>
        </form>
      </Form>
    </>
  )
}