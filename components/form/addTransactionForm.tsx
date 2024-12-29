"use client"
import React, { useState } from "react"
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
import { addTransactionToBudget } from "@/lib/actionsTransaction"
import { useQueryClient } from "@tanstack/react-query"
import { SpinnerForm } from "@/components/SpinnerForm"

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
  monthPlanId?: string
}) {
  const [loading, setLoading] = useState<boolean>(false)
  const queryClient = useQueryClient()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    // console.log("Données soumises :", data)
    try {
      setLoading(true)
      const { nameTransaction, amount } = data
      const response = await addTransactionToBudget({
        budgetId: budget.budgetId,
        amount,
        name: nameTransaction,
      })

      if (response) {
        queryClient.invalidateQueries({ queryKey: ["budget_by_id"] })
        toast.success("Nouvelle Transaction ajouté !", {
          duration: 1200,
          className: "text-primary",
        })
        setTimeout(() => {
          isOpen(false)
        }, 1200)
      } else {
        toast.error("Une erreur est survenue veuillez réessayer", {
          duration: 1200,
          className: "text-red-500",
        })
      }
    } catch (error) {
      toast.error("Une erreur est survenue veuillez réessayer", {
        duration: 1200,
        className: "text-red-500",
      })
      console.error("Erreur lors de la modification de la transaction:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <h3 className='text-center font-sans'>
        Ajoutez une transaction pour le budget{" "}
        <span className='font-sans'>{budget.budgetName.toUpperCase()}</span>
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

          <Button
            type='submit'
            className='w-full bg-emerald-600 font-sans text-white hover:bg-emerald-700'
          >
            {loading && <SpinnerForm />} Ajoutez la transaction
          </Button>
        </form>
      </Form>
    </>
  )
}
