import React from "react"
import { Button } from "@/components/ui/button"

export function CustomButton({
  triggerSentence,
  className,
}: {
  triggerSentence: string
  className?: string
}) {
  return (
    <Button
      className={`w-3/4 md:w-1/2 mx-auto text-sm cursor-pointer font-semibold rounded-xl text-white px-4 py-2 bg-primary hover:bg-primary/90 transition-all duration-300 ease-in-out flex justify-center ${className}`}
    >
      {triggerSentence}
    </Button>
  )
}
