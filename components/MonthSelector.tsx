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
      <div className='flex flex-row mb-6 items-center justify-start gap-3'>
        <CalendarDays className='inline h-8 w-8 text-gray-800' />
        <div className='flex items-start justify-center flex-col'>
          <h2 className='text-primary text-2xl font-title flex items-center gap-3'>
            Faire mon budget du mois de
          </h2>
          <p className='font-sans text-gray-600 text-sm text-center w-full'>
            <ArrowDown className='inline h-4 w-4' /> Cliquez sur le mois que
            vous souhaitez
            <ArrowDown className='inline h-4 w-4' />
          </p>
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
        {months.map((month) => (
          <div key={month} className={`flex justify-center`}>
            <Button
              onClick={() => navigateToMonth(month)}
              className='w-full md:w-1/2 text-center font-sans text-white'
            >
              {month.toUpperCase()}
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}
