"use client"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { CategoryType } from "@/types"
import { Card, CardContent } from "../ui/card"
import { ChartColumnStacked } from "lucide-react"
import { useRouter } from "next/navigation"

export function CategoryCards({ categories }: { categories: CategoryType[] }) {
  const router = useRouter()
  return (
    <div className='py-4'>
      <div className='flex flex-col mb-5 font-sans'>
        <h2 className='text-slate-50 text-3xl font-title flex items-center gap-3'>
          <ChartColumnStacked className='inline h-6 w-6 text-slate-200' />
          Catégories
        </h2>
        <p className='text-sm text-slate-200 '>catégories principales</p>
      </div>
      {categories.length > 0 && (
        <Card className='p-2 bg-primary border-0 shadow-2xl text-slate-50 font-sans'>
          <CardContent className='overflow-x-auto px-0'>
            <Table className='table-auto w-full'>
              <TableHeader className='border-slate-200 border-b'>
                <TableRow>
                  <TableHead className='font-title text-left text-slate-50'>
                    Catégorie
                  </TableHead>
                  <TableHead className='font-title text-left text-slate-50'>
                    Montant total
                  </TableHead>
                  <TableHead className='font-title text-left text-slate-50'>
                    Budgets
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.map((category: CategoryType) => (
                  <TableRow
                    key={category.id}
                    className='cursor-pointer border-0'
                    onClick={() => router.push(`/categories/${category.id}`)}
                  >
                    <TableCell className='text-sm'>
                      {category.name || "N/A"}
                    </TableCell>
                    <TableCell className='text-sm'>
                      {category.budgets.reduce(
                        (total, budget) => total + budget.amount,
                        0
                      )}{" "}
                      €
                    </TableCell>
                    <TableCell className='text-sm'>
                      {category.budgets.map((budget) => (
                        <div key={budget.id} className='mb-1'>
                          {budget.name}
                        </div>
                      ))}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
