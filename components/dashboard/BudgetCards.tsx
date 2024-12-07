import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BudgetType, CategoryType } from "@/types"
import Link from "next/link"
import { Mail } from "lucide-react"

export function BudgetCards({ budgets }: { budgets: CategoryType[] }) {
  return (
    <div className='container py-4 my-4'>
      <div className='flex flex-col mb-6'>
        <h2 className='text-primary text-3xl font-title flex items-center gap-3'>
          <Mail className='inline h-6 w-6 text-gray-800' /> Mes enveloppes
        </h2>
        <p className='font-sans text-gray-600 text-sm'>
          Suivez vos finances et atteignez vos objectifs financier
        </p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {budgets.map((categorie: CategoryType) =>
          categorie.budgets.map((budget: BudgetType) => (
            <Link href={`/budgets/${budget.id}`} key={budget.id}>
              <Card className='hover:scale-105 hover:shadow-lg hover:cursor-pointer transition-all duration-300 ease-in-out'>
                <CardHeader
                  className={`bg-primary text-white rounded-t-xl p-4 mb-4`}
                >
                  <CardTitle className='italic font-title'>
                    {budget.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className='flex flex-col gap-3'>
                  <p className='font-sans text-3xl text-gray-900'>
                    {budget.amount}€
                  </p>
                  <p className='text-sm text-gray-600'>
                    Categorie: {categorie.name}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}
