import React from "react"
import { CircleChevronLeft } from "lucide-react"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"

export function BackNavigation({ router }: { router: AppRouterInstance }) {
  return (
    <div className='px-2 flex items-start flex-col mb-8 w-full md:w-2/3'>
      <CircleChevronLeft
        className='ml-3 h-10 mb-1 w-10 text-slate-50 cursor-pointer text-left hover:scale-110 transition-all duration-300 ease-in-out'
        onClick={() => router.back()}
      />
      <p className='text-slate-50 text-xs'>page précédente</p>
    </div>
  )
}
