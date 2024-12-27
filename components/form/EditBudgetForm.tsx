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
import { Card, CardContent, CardHeader } from "../ui/card"
import { updateBudgetAction } from "@/lib/actionsBudget"
import { LoadingSpinner } from "@/components/LoadingSpinner"
import { useQueryClient } from "@tanstack/react-query"

const formSchema = z.object({
  budgetName: z.string().min(1, "Le nom de l'enveloppe est obligatoire."),
  amount: z.coerce
    .number({ invalid_type_error: "Le montant doit être un nombre." })
    .positive("Le montant doit être supérieur à 0."),
})

export function EditBudgetForm({
  budget,
  isOpen,
}: {
  budget: { id: string; name: string; amount: number }
  isOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const [loading, setLoading] = useState<boolean>(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      budgetName: budget.name,
      amount: budget.amount,
    },
  })

  const queryClient = useQueryClient()

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setLoading(true)
      const { amount, budgetName } = data
      const response = await updateBudgetAction({
        id: budget.id,
        amount,
        name: budgetName,
      })
      queryClient.invalidateQueries({ queryKey: ["categories"] })
      if (response) {
        toast.success("Enveloppe modifiée !", {
          duration: 1200,
          className: "text-primary",
        })
        setTimeout(() => {
          isOpen(false)
        }, 1500)
      } else {
        toast.error("Une erreur est survenue veuillez réessayer", {
          duration: 1200,
          className: "text-red-500",
        })
      }
    } catch (error) {
      toast.error("Une erreur est survenue veuillez réessayer", {
        duration: 1500,
        className: "text-red-500",
      })
      console.error("Erreur lors de la modification de l'enveloppe:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className='w-full border-0 shadow-2xl p-0 bg-primary text-slate-50 hover:border-primary/90 hover:shadow-sm transition-all duration-300 ease-in-out font-sans'>
      <CardHeader>
        <h3 className='text-2xl font-title text-center'>
          {budget.name.toUpperCase()}
        </h3>
      </CardHeader>
      <CardContent className='px-8'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='budgetName'
              render={({ field }) => (
                <FormItem>
                  <div className='w-full md:w-5/6 py-2 mx-auto gap-3 flex flex-col'>
                    <FormLabel>Nom</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className='focus:ring-0 focus:outline-none focus:border-none'
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='amount'
              render={({ field }) => (
                <FormItem>
                  <div className='w-full md:w-5/6 py-2 mx-auto gap-3 flex flex-col'>
                    <FormLabel>Montant</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Votre montant'
                        {...field}
                        type='number'
                        className='focus:ring-0 focus:outline-none focus:border-none'
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <div className='flex justify-end mt-6'>
              <Button
                type='submit'
                className='bg-slate-200 font-sans  text-primary hover:bg-slate-200/90 hover:scale-110 transition-all duration-300 ease-in-out'
              >
                {loading && <LoadingSpinner />} {`Modifiez l'enveloppe`}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
