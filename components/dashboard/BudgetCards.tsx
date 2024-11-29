import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BudgetType, CategoryType } from "@/types"

export function BudgetCards({ budgets }: { budgets: CategoryType[] }) {
  return (
    <div className='container mx-auto my-4'>
      <div className='flex flex-col mb-6'>
        <h2 className='text-3xl font-bold'>Budgets</h2>
        <p className='text-sm text-gray-500'>
          Suivez vos finances et atteignez vos objectifs financier
        </p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {budgets.map((categorie: CategoryType) =>
          categorie.budgets.map((budget: BudgetType) => (
            <Card
              key={budget.id}
              className='hover:scale-105 hover:shadow-lg hover:cursor-pointer transition-all duration-300 ease-in-out'
            >
              <CardHeader
                className={`bg-[#118D70] text-white rounded-t-xl p-4 mb-4`}
              >
                <CardTitle className='italic'>{budget.name}</CardTitle>
              </CardHeader>
              <CardContent className='flex flex-col gap-3'>
                <p className='text-3xl font-bold italic'>{budget.amount}€</p>
                <p className='text-sm text-gray-500'>
                  Categorie: {categorie.name}
                </p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
