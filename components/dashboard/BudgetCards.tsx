import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BudgetType, CategoryType } from "@/types"
import Link from "next/link"
import { Mail } from "lucide-react"

export function BudgetCards({ budgets }: { budgets: CategoryType[] }) {
  return (
    <div className='container py-4 my-4'>
      <div className='flex flex-col mb-5 font-sans'>
        <h2 className='text-slate-50 text-3xl font-title flex items-center gap-3'>
          <Mail className='inline h-6 w-6 text-primary' /> Mes enveloppes
        </h2>
        <p className='text-sm text-slate-50'>
          Suivez vos finances et atteignez vos objectifs financier
        </p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {budgets.map((categorie: CategoryType) =>
          categorie.budgets.map((budget: BudgetType) => (
            <Link href={`/budgets/${budget.id}`} key={budget.id}>
              <Card className='bg-primary border-0 shadow-2xl font-sans p-0 hover:scale-105 hover:shadow-lg hover:cursor-pointer transition-all duration-300 ease-in-out text-slate-50'>
                <CardHeader
                  className={`border-b border-slate-50 text-slate-50 rounded-t-xl p-4 `}
                >
                  <CardTitle className='font-title'>{budget.name}</CardTitle>
                </CardHeader>
                <CardContent className='flex flex-col gap-3 p-4'>
                  <p className='text-base'>{budget.amount}€</p>
                  <p className='text-sm'>Categorie: {categorie.name}</p>
                </CardContent>
              </Card>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}
