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
    <Card className='p-4'>
      <div className='flex flex-col mb-6'>
        <h2 className='text-3xl font-bold'>Catégories</h2>
      </div>

      <CardContent className='overflow-x-auto px-0'>
        <Table>
          <TableHeader className='bg-gray-100 text-[#118D70]'>
            <TableRow className='text-[#118D70]'>
              <TableHead className='text-[#118D70] font-semibold'>
                Catégorie
              </TableHead>
              <TableHead className='text-[#118D70] font-semibold'>
                Montal total
              </TableHead>
              <TableHead className='text-[#118D70] font-semibold'>
                Budgets
              </TableHead>
              <TableHead className='text-[#118D70] font-semibold'>{`dépensés aujourd'hui`}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category: CategoryType) => (
              <TableRow
                key={category.id}
                className='hover:bg-gray-100 font-medium'
              >
                <TableCell>{category.name || "N/A"}</TableCell>
                <TableCell>
                  {category.budgets.reduce(
                    (total, budget) => total + budget.amount,
                    0
                  )}{" "}
                  €
                </TableCell>
                <TableCell>
                  {category.budgets.map((budget) => (
                    <div key={budget.id} className='mb-2'>
                      {budget.name}
                    </div>
                  ))}
                </TableCell>
                <TableCell>
                  {/* <div>
                    {user.categories.map((category) => (
                      <div key={category.id} className='mb-2'>
                        <p className='font-medium'>{category.name}</p>
                        <ul className='pl-4'>
                          {category.budgets.map((budget) => (
                            <li key={budget.id}>
                              {budget.name} :{" "}
                              <span className='font-semibold'>
                                {budget.amount} €
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div> */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
