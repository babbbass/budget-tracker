import React, { useState } from "react"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { updateTransaction } from "@/lib/actionsTransaction"
import { SpinnerForm } from "@/components/SpinnerForm"
import { useQueryClient } from "@tanstack/react-query"

const formSchema = z.object({
  budgetName: z.string().min(1, "Le nom de l'enveloppe est obligatoire."),
  nameTransaction: z
    .string()
    .min(1, "Le nom de la transaction est obligatoire."),
  amount: z.coerce
    .number({ invalid_type_error: "Le montant doit être un nombre." })
    .positive("Le montant doit être supérieur à 0."),
})

export function EditTransactionForm({
  transaction,
  budgetName,
  isOpen,
}: {
  transaction: {
    id: string
    amount: number
    name: string
    budgetId: string
  }
  budgetName: string
  isOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const queryClient = useQueryClient()
  const [loading, setLoading] = useState<boolean>(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      budgetName,
      nameTransaction: transaction.name,
      amount: transaction.amount,
    },
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setLoading(true)
      const { nameTransaction, amount } = data
      const response = await updateTransaction({
        id: transaction.id,
        nameTransaction,
        amount,
      })

      if (response) {
        queryClient.invalidateQueries({ queryKey: ["budget_by_id"] })
        toast.success("Transaction modifiée !", {
          duration: 1200,
          className: "text-primary",
        })
        setTimeout(() => {
          isOpen(false)
        }, 1200)
        // onSuccess()
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
      <h3 className='text-2xl font-title text-center'>{transaction.name}</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <FormField
            control={form.control}
            name='budgetName'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Budget</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='nameTransaction'
            render={({ field }) => (
              <FormItem>
                <FormLabel>nom transaction</FormLabel>
                <Input {...field} />
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

          <div className='flex justify-end'>
            <Button
              type='submit'
              className='w-2/3 bg-primary font-sans text-slate-50 hover:bg-primary/90 transition-all duration-300 ease-in-out hover:scale-105'
            >
              {loading && <SpinnerForm />} Modifier
            </Button>
          </div>
        </form>
      </Form>
    </>
  )
}
