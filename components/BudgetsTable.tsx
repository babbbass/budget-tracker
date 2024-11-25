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
import { ChevronsUpDown, Trash2, Pencil } from "lucide-react"

const ITEMS_PER_PAGE = 2

export const BudgetsTable = ({ categoriesData }: { categoriesData: any }) => {
  const [categories, setCategories] = useState(categoriesData)
  const [currentPage, setCurrentPage] = useState(1)
  const [sortColumn, setSortColumn] = useState(null)
  const [sortOrder, setSortOrder] = useState("asc")

  // Pagination
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const paginatedCategories = categoriesData.slice(startIndex, endIndex)

  const totalPages = Math.ceil(categories.length / ITEMS_PER_PAGE)

  // Sort
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

  // Modification
  const handleEdit = (id) => {
    alert(`Modifier la catégorie avec l'ID : ${id}`)
  }

  // Suppression
  const handleDelete = (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette catégorie ?")) {
      setCategories(categories.filter((category: string) => category.id !== id))
    }
  }

  return (
    <div className='p-6 bg-white rounded-lg shadow-md'>
      <h1 className='text-2xl font-bold mb-4'>Catégories et Sous-Catégories</h1>
      <ScrollArea className='max-w-full overflow-x-auto'>
        <Table>
          {/* En-tête du tableau */}
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
          {/* Corps du tableau */}
          <TableBody>
            {paginatedCategories.map((category: { name: string }) => (
              <TableRow key={category.id}>
                <TableCell className='text-center font-medium'>
                  {category.name}
                </TableCell>
                <TableCell className='text-center'>
                  {category.subCategories.map(
                    (sub: { name: string }, index: number) => (
                      <span key={index}>{sub.name}</span>
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
                      //variant='destructive'
                    />
                    {/* <Button
                      variant='destructive'
                      size='sm'
                      onClick={() => handleDelete(category.id)}
                    > */}

                    {/* </Button> */}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>

      <div className='flex items-center justify-between mt-4'>
        <Button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Précédent
        </Button>
        <span>
          Page {currentPage} sur {totalPages}
        </span>
        <Button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Suivant
        </Button>
      </div>
    </div>
  )
}
