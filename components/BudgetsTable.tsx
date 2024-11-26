"use client"

import React, { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  TableHead,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  ChevronsUpDown,
  Trash2,
  Pencil,
  ChevronRight,
  ChevronLeft,
} from "lucide-react"
import { Card } from "./ui/card"
import { CategoryType } from "@/types"
import { Progress } from "@/components/ui/progress"
import { useRouter } from "next/navigation"
import { Router } from "next/router"

const ITEMS_PER_PAGE = 2

export const BudgetsTable = ({
  categoriesData,
}: {
  categoriesData: CategoryType[]
}) => {
  const router = useRouter()
  const [categories, setCategories] = useState(categoriesData)
  const [currentPage, setCurrentPage] = useState(1)
  const [sortColumn, setSortColumn] = useState(null)
  const [sortOrder, setSortOrder] = useState("asc")

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const paginatedCategories = categoriesData.slice(startIndex, endIndex)

  const totalPages = Math.ceil(categories.length / ITEMS_PER_PAGE)

  //@ts-expect-error next-line
  const handleSort = (column) => {
    const order = sortColumn === column && sortOrder === "asc" ? "desc" : "asc"
    setSortColumn(column)
    setSortOrder(order)

    const sortedCategories = [...categories].sort((a, b) => {
      if (column === "name") {
        return order === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name)
      }
      if (column === "amount") {
        const totalA = a.subCategories.reduce((acc, sub) => acc + sub.amount, 0)
        const totalB = b.subCategories.reduce((acc, sub) => acc + sub.amount, 0)
        return order === "asc" ? totalA - totalB : totalB - totalA
      }
      return 0
    })

    setCategories(sortedCategories)
  }

  const handleEdit = (id: number) => {
    alert(`Modifier la catégorie avec l'ID : ${id}`)
  }

  const handleDelete = (id: number) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette catégorie ?")) {
      setCategories(
        categories.filter((category: CategoryType) => category.id !== id)
      )
    }
  }

  // const progressValue =
  //      totalTransactionAmount > budget.amount
  //      ? 100
  //      : (totalTransactionAmount /budget.amount) * 100

  //      const transactionCount = budget.transactions ? budget.transactions.length : 0;
  //      const totalTransactionAmount = budget.transactions
  //          ? budget.transactions.reduce(
  //              (sum, transaction) => sum + transaction.amount, 0)
  //          : 0

  //      const remainingAmount = budget.amount - totalTransactionAmount

  return (
    <Card className='p-6 bg-white rounded-lg shadow-md w-full md:w-1/3'>
      <h1 className='text-2xl font-bold mb-4'>Tous mes budgets</h1>
      <ScrollArea className='max-w-full overflow-x-auto'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead
                className='cursor-pointer'
                onClick={() => handleSort("name")}
              >
                Catégorie
                <ChevronsUpDown className='w-4 h-4 inline-block ml-1' />
              </TableHead>
              <TableHead>Sous-catégories</TableHead>
              <TableHead
                className='cursor-pointer'
                onClick={() => handleSort("amount")}
              >
                Montants
                <ChevronsUpDown className='w-4 h-4 inline-block ml-1' />
              </TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedCategories.map(
              (category: {
                name: string
                id: number
                subCategories: Array<{ name: string; amount: number }>
              }) => (
                <TableRow
                  key={category.id}
                  className='hover:bg-gray-100 border-0 cursor-pointer h-16'
                  onClick={() => router.push(`/budgets/${category.id}`)}
                >
                  <TableCell className='font-medium'>{category.name}</TableCell>
                  <TableCell className='text-center'>
                    {category.subCategories.map(
                      (sub: { name: string }, index: number) => (
                        <div
                          key={index}
                          className='flex justify-center flex-col'
                        >
                          <span className='font-semibold'>{sub.name}</span>
                          <span>0 transaction(s)</span>
                          <Progress value={60} className='mt-2' />
                        </div>
                      )
                    )}
                  </TableCell>
                  <TableCell className='text-center'>
                    {category.subCategories.reduce(
                      (acc, sub) => acc + sub.amount,
                      0
                    )}{" "}
                    €
                  </TableCell>
                  <TableCell>
                    <div className='flex gap-2'>
                      <Pencil
                        className='w-4 h-4 mr-2'
                        onClick={() => handleEdit(category.id)}
                      />
                      <Trash2
                        className='w-4 h-4 mr-2'
                        onClick={() => handleDelete(category.id)}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </ScrollArea>

      <div className='flex items-center justify-between mt-4'>
        <Button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className={
            currentPage === 1 ? "opacity-0" : "bg-sky-800 hover:bg-sky-900"
          }
        >
          <ChevronLeft className='w-10 h-10' />
        </Button>
        <span>
          Page {currentPage} / {totalPages}
        </span>
        <Button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          className={
            currentPage === totalPages
              ? "opacity-0"
              : "bg-sky-800 hover:bg-sky-900"
          }
        >
          <ChevronRight className='w-10 h-10' />
        </Button>
      </div>
    </Card>
  )
}
