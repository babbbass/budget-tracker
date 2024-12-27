import React from "react"
import { Loader2 } from "lucide-react"
import { Button } from "./ui/button"

export function LoadingSpinner() {
  return (
    <div className='flex items-center justify-center flex-col gap-3'>
      <Button className='bg-primary hover:bg-primary/90 transition-colors duration-200'>
        <Loader2 className='h-10 w-10 animate-spin' />
        <span className='font-sans'>Vos finances arrivent...</span>
      </Button>
    </div>
  )
}
