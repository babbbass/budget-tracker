"use client"
import React, { useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
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
import { toast } from "sonner"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { Categories } from "@/types"
import { LoadingSpinner } from "@/components/LoadingSpinner"

const formSchema = z
  .object({
    category: z.string().min(1, "La catégorie est obligatoire."),
    budgetName: z.string().min(1, "Le nom de la sous-catégorie est requis."),
    amount: z.coerce
      .number({ invalid_type_error: "Le montant doit être un nombre." })
      .positive("Le montant doit être supérieur à 0."),
    startDate: z.date().optional(),
    endDate: z.date().optional(),
  })
  .refine(
    (data) => {
      if (data.startDate && data.endDate) {
        return data.endDate > data.startDate
      }
      return true
    },
    {
      message: "La date de fin doit être postérieure à la date de début",
      path: ["endDate"],
    }
  )
const categories = Object.values(Categories)
export function AddBudgetForm({
  emailUser,
  isOpen,
}: {
  emailUser: string
  isOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const router = useRouter()
  const [showDates, setShowDates] = useState(false)
  const [loading, setLoading] = useState<boolean>(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log("Données soumises :", data)
    try {
      setLoading(true)
      const { category, budgetName, amount, startDate, endDate } = data
      const response = await addBudget(
        emailUser,
        category,
        budgetName,
        amount,
        startDate,
        endDate
      )

      if (response) {
        toast.success("Budget ajouté avec succés", {
          duration: 1500,
          className: "text-green-500",
        })
        setTimeout(() => {
          isOpen(false)
        }, 2000)
        router.push("/")
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
      console.error("Erreur lors de l'ajout du budget:", error)
    } finally {
      setLoading(false)
    }
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
              <Select
                onValueChange={(value) => {
                  field.onChange(value)
                  setShowDates(value === "Épargnes" || value === "Dettes")
                }}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='choisisez une catégorie' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((category: string) => (
                    <SelectItem
                      key={category}
                      value={category}
                      className='cursor-pointer hover:bg-gray-200'
                    >
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
          name='budgetName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom enveloppe</FormLabel>
              <FormControl>
                <Input
                  className='hover:border-emerald-600'
                  placeholder='Ex: Livret A, Fitness Park...'
                  {...field}
                />
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
                <Input
                  className='hover:border-emerald-600'
                  placeholder='Votre montant'
                  {...field}
                  type='number'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {showDates && (
          <>
            <FormField
              control={form.control}
              name='startDate'
              render={({ field }) => (
                <FormItem>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP", { locale: fr })
                          ) : (
                            <span>Date de debut</span>
                          )}
                          <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className='w-auto p-0' align='start'>
                      <Calendar
                        mode='single'
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < new Date(new Date().setHours(0, 0, 0, 0)) ||
                          date < new Date("1900-01-01")
                        }
                        initialFocus
                        locale={fr}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='endDate'
              render={({ field }) => (
                <FormItem>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP", { locale: fr })
                          ) : (
                            <span>Date de fin</span>
                          )}
                          <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className='w-auto p-0' align='start'>
                      <Calendar
                        mode='single'
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < new Date(new Date().setHours(0, 0, 0, 0)) ||
                          date < new Date("1900-01-01")
                        }
                        initialFocus
                        locale={fr}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}
        <Button
          type='submit'
          className='w-full bg-emerald-600 text-white font-sans hover:bg-emerald-700'
        >
          {loading && <LoadingSpinner />}
          Ma nouvelle enveloppe
        </Button>
      </form>
    </Form>
  )
}
