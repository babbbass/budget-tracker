import React, { useState } from "react"
import { TransactionType } from "@/types"
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
import { Card, CardContent, CardHeader } from "../ui/card"
import { updateTransaction } from "@/lib/actionsTransaction"
import { LoadingSpinner } from "@/components/LoadingSpinner"

const formSchema = z.object({
  budgetName: z.string().min(1, "Le nom du budget est obligatoire."),
  nameTransaction: z
    .string()
    .min(1, "Le nom de la transaction est obligatoire."),
  amount: z.coerce
    .number({ invalid_type_error: "Le montant doit être un nombre." })
    .positive("Le montant doit être supérieur à 0."),
})

export function EditTransactionForm({
  transaction,
  budget,
  onSuccess,
}: {
  transaction: TransactionType
  budget: string
  onSuccess: () => void
}) {
  const [loading, setLoading] = useState<boolean>(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      budgetName: budget,
      nameTransaction: transaction.name,
      amount: transaction.amount,
    },
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setLoading(true)
      const { nameTransaction, amount, budgetName } = data
      const response = await updateTransaction(
        transaction.id,
        nameTransaction,
        amount,
        budgetName
      )

      if (response) {
        toast.success("Transaction modifiée !", {
          duration: 1500,
          className: "text-green-500",
        })
        onSuccess()
      } else {
        toast.error("Une erreur est survenue veuillez réessayer", {
          duration: 1500,
          className: "text-red-500",
        })
      }
    } catch (error) {
      toast.error("Une erreur est survenue veuillez réessayer", {
        duration: 1500,
        className: "text-red-500",
      })
      console.error("Erreur lors de la modification de la transaction:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className='w-full p-4 hover:shadow-2xl bg-primary text-slate-50 font-sans'>
      <CardHeader>
        <h3 className='text-2xl font-title text-center'>{transaction.name}</h3>
      </CardHeader>
      <CardContent>
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
                    <Input
                      placeholder='Votre montant'
                      {...field}
                      type='number'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='flex justify-end'>
              <Button
                type='submit'
                className='w-2/3 bg-slate-200 font-sans text-primary hover:bg-slate-200/90 transition-all duration-300 ease-in-out hover:scale-105'
              >
                {loading && <LoadingSpinner />} Modifier
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
