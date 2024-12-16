"use client"

import React, { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
// Importations Prisma côté client
import { addBudget } from "@/lib/actionsBudget"

// Types correspondant à votre schéma Prisma
type BudgetItem = {
  id?: string
  name: string
  amount: number
}

type CategoryWithBudgets = {
  id?: string
  name: string
  budgets: BudgetItem[]
}

// Types de catégories prédéfinies basées sur votre schéma
const INITIAL_CATEGORIES: CategoryWithBudgets[] = [
  {
    name: "Revenus",
    budgets: [{ name: "", amount: 0 }],
  },
  {
    name: "Dépenses Fixes",
    budgets: [{ name: "", amount: 0 }],
  },
  {
    name: "Dépenses Variables",
    budgets: [{ name: "", amount: 0 }],
  },
  {
    name: "Épargne",
    budgets: [{ name: "", amount: 0 }],
  },
]

const BudgetConfiguration: React.FC = () => {
  const [categories, setCategories] =
    useState<CategoryWithBudgets[]>(INITIAL_CATEGORIES)
  const [isLoading, setIsLoading] = useState(false)

  // Met à jour un budget spécifique dans une catégorie
  const updateBudgetItem = (
    categoryIndex: number,
    budgetIndex: number,
    field: keyof BudgetItem,
    value: string
  ) => {
    const newCategories = [...categories]

    if (field === "amount") {
      newCategories[categoryIndex].budgets[budgetIndex][field] =
        parseFloat(value) || 0
    } else {
      newCategories[categoryIndex].budgets[budgetIndex][field] = value
    }

    setCategories(newCategories)
  }

  const addBudgetItem = (categoryIndex: number) => {
    const newCategories = [...categories]
    newCategories[categoryIndex].budgets.push({
      name: "",
      amount: 0,
    })
    setCategories(newCategories)
  }

  // Calcule le total des budgets pour une catégorie
  const calculateTotal = (budgets: BudgetItem[]) =>
    budgets.reduce((sum, item) => sum + item.amount, 0)

  // Soumet la configuration des budgets
  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      // Parcourt chaque catégorie
      for (const category of categories) {
        // Filtre les budgets avec un nom non vide
        //console.log("category", category)

        const validBudgets = category.budgets.filter(
          (budget) => budget.name.trim() !== ""
        )

        // Si pas de budgets valides, passe à la catégorie suivante
        if (validBudgets.length === 0) continue

        // Crée la catégorie
        // const createdCategory = await createCategory({
        //   name: category.name,
        // })

        // Crée les budgets pour cette catégorie
        for (const budget of validBudgets) {
          await addBudget({
            email: "beuseastwood@msn.com",
            budgetName: budget.name,
            categoryName: category.name,
            amount: budget.amount,
          })
        }
      }

      toast.success("Configuration budgétaire enregistrée")
      // Réinitialise les catégories après sauvegarde
      setCategories(INITIAL_CATEGORIES)
    } catch (error) {
      console.error("Erreur lors de l'enregistrement:", error)
      toast.error("Échec de l'enregistrement")
    } finally {
      setIsLoading(false)
    }
  }

  const renderCategoryCard = (
    category: CategoryWithBudgets,
    categoryIndex: number
  ) => (
    <Card key={category.name} className='w-full mb-4'>
      <CardHeader>
        <CardTitle className='flex justify-between items-center'>
          {category.name}
          <span>
            Total: {calculateTotal(category.budgets).toLocaleString()}€
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[200px]'>Libellé</TableHead>
              <TableHead className='text-right'>Montant</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {category.budgets.map((budget, budgetIndex) => (
              <TableRow key={budgetIndex}>
                <TableCell>
                  <Input
                    placeholder='Nom du budget'
                    value={budget.name}
                    onChange={(e) =>
                      updateBudgetItem(
                        categoryIndex,
                        budgetIndex,
                        "name",
                        e.target.value
                      )
                    }
                  />
                </TableCell>
                <TableCell className='text-right'>
                  <Input
                    type='number'
                    placeholder='Montant'
                    value={budget.amount || ""}
                    onChange={(e) =>
                      updateBudgetItem(
                        categoryIndex,
                        budgetIndex,
                        "amount",
                        e.target.value
                      )
                    }
                    className='text-right'
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button
          variant='outline'
          className='mt-2 w-full'
          onClick={() => addBudgetItem(categoryIndex)}
        >
          Ajouter un budget
        </Button>
      </CardContent>
    </Card>
  )

  return (
    <div className='w-full max-w-4xl mx-auto p-4 space-y-4'>
      <h1 className='text-2xl font-bold mb-4'>Configuration Budgétaire</h1>

      {categories.map((category, index) => renderCategoryCard(category, index))}

      <Button
        className='w-full'
        variant='default'
        onClick={handleSubmit}
        disabled={isLoading}
      >
        {isLoading ? "Enregistrement..." : "Enregistrer la configuration"}
      </Button>
    </div>
  )
}

export default BudgetConfiguration
