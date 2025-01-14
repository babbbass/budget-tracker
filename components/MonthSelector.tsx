"use client"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { CalendarDays, ArrowDown } from "lucide-react"
import { months } from "@/lib/utils/constants"

export function MonthSelector() {
  const router = useRouter()

  const navigateToMonth = (month: string) => {
    router.push(`/envelopes/${month.toLowerCase()}`)
  }

  return (
    <div className='my-4 w-full'>
      <div className='flex flex-col mb-6 items-start md:items-center justify-center gap-1'>
        <div className='flex items-center gap-2 justify-center'>
          <CalendarDays className='h-6 w-6 text-primary' />
          <h2 className='text-slate-50 text-xl md:text-2xl font-title'>
            Mon budget par mois
          </h2>
        </div>
        <p className='flex items-center font-sans md:justify-center text-slate-50 text-sm  w-full'>
          <ArrowDown className='h-3 w-3 mr-1' />
          Cliquez sur le mois souhaitez
          <ArrowDown className='h-3 w-3 ml-1' />
        </p>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
        {months.map((month) => (
          <div key={month} className={`flex justify-start md:justify-center`}>
            <Button
              onClick={() => navigateToMonth(month)}
              className='w-full md:w-28 text-center font-sans text-slate-50 bg-primary hover:bg-primary/90 transition-all duration-300 ease-in-out hover:scale-105'
            >
              {month.toUpperCase()}
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}
