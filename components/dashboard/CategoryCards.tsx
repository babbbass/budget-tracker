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

export function CategoryCards({ categories }: { categories: CategoryType[] }) {
  return (
    <div className='py-4'>
      <div className='flex flex-col mb-6'>
        <h2 className='text-primary text-3xl font-bold'>Catégories</h2>
        <p className='text-sm text-gray-600'>catégories principales</p>
      </div>
      {categories.length > 0 && (
        <Card className='p-4'>
          <CardContent className='overflow-x-auto px-0'>
            <Table className='table-auto w-full'>
              <TableHeader className='bg-gray-100'>
                <TableRow>
                  <TableHead className='text-gray-600 font-title text-left'>
                    Catégorie
                  </TableHead>
                  <TableHead className='text-gray-600 font-title text-left'>
                    Montant total
                  </TableHead>
                  <TableHead className='text-gray-600 font-title text-left'>
                    Budgets
                  </TableHead>
                  <TableHead className='text-gray-600 font-title text-left hidden md:table-cell'>
                    {`Dépensés aujourd'hui`}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.map((category: CategoryType) => (
                  <TableRow
                    key={category.id}
                    className='hover:bg-gray-100 font-medium border-b'
                  >
                    <TableCell className='text-sm text-sans text-black'>
                      {category.name || "N/A"}
                    </TableCell>
                    <TableCell className='text-sm text-sans'>
                      {category.budgets.reduce(
                        (total, budget) => total + budget.amount,
                        0
                      )}{" "}
                      €
                    </TableCell>
                    <TableCell className='text-sm text-sans'>
                      {category.budgets.map((budget) => (
                        <div key={budget.id} className='mb-1'>
                          {budget.name}
                        </div>
                      ))}
                    </TableCell>
                    <TableCell className='text-sm hidden md:table-cell'>
                      {/* Contenu pour "dépensés aujourd'hui" */}
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
