"use client"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { CalendarDays, ArrowDown } from "lucide-react"

const months = [
  "Janvier",
  "Fevrier",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Aout",
  "Septembre",
  "Octobre",
  "Novembre",
  "Decembre",
]

export function MonthSelector() {
  const router = useRouter()

  const navigateToMonth = (month: string) => {
    router.push(`/envelopes/${month.toLowerCase()}`)
  }

  return (
    <div className='container py-4 my-4'>
      <div className='flex flex-col mb-6 items-center justify-center gap-3'>
        <div className='flex items-center gap-2 justify-center'>
          <CalendarDays className='h-6 w-6 text-slate-200' />
          <h2 className='text-slate-50 text-xl md:text-2xl font-title'>
            Mon budget par mois
          </h2>
        </div>
        <p className='flex items-center justify-center font-sans text-slate-50 text-sm  w-full'>
          <ArrowDown className='h-3 w-3 mr-1' />
          Cliquez sur le mois souhaitez
          <ArrowDown className='h-3 w-3 ml-1' />
        </p>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
        {months.map((month) => (
          <div key={month} className={`flex justify-center`}>
            <Button
              onClick={() => navigateToMonth(month)}
              className='w-full md:w-1/2 text-center font-sans text-slate-50 bg-primary hover:bg-primary/90 transition-all duration-300 ease-in-out'
            >
              {month.toUpperCase()}
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}
