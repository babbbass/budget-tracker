"use client"
import React from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { addBudget } from "@/lib/actionsBudget"

const formSchema = z.object({
  category: z.string().min(1, "La catégorie est obligatoire."),
  subCategoryName: z.string().min(1, "Le nom de la sous-catégorie est requis."),
  amount: z.coerce
    .number({ invalid_type_error: "Le montant doit être un nombre." })
    .positive("Le montant doit être supérieur à 0."),
  // forms: z
  //   .array(
  //     z.object({
  //       subCategoryName: z
  //         .string()
  //         .min(1, "Le nom de la sous-catégorie est requis."),
  //       category: z.string().min(1, "La catégorie est obligatoire."),
  //       amount: z
  //         .number({ invalid_type_error: "Le montant doit être un nombre." })
  //         .positive("Le montant doit être supérieur à 0."),
  //     })
  //   )
  //   .min(1, "Ajoutez au moins une entrée.")
  //   .max(5, "Vous ne pouvez pas ajouter plus de 5 formulaires."),
})

const categories = [
  "Revenus",
  "Dettes",
  "Épargnes",
  "Investissements",
  "Dépenses fixes",
  "Dépenses variables",
]
export function AddBudgetForm({ emailUser }: { emailUser: string }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log("Données soumises :", data)
    const { category, subCategoryName, amount } = data
    const response = await addBudget(
      emailUser,
      category,
      subCategoryName,
      amount
    )
    console.log(response)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <FormField
          control={form.control}
          name='category'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categorie</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='choisisez une catégorie' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='subCategoryName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Budget</FormLabel>
              <FormControl>
                <Input placeholder='Ex: Livret A, Fitness Park...' {...field} />
              </FormControl>
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
          Soumettre
        </Button>
      </form>
    </Form>
  )
}
