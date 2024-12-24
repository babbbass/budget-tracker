import React from "react"
import { Trash2 } from "lucide-react"

type TrashType = {
  category: {
    id: string
  }
  handleDelete: (id: string) => void
}
export function TrashComponent({ category, handleDelete }: TrashType) {
  return (
    <Trash2
      className='w-4 h-4 mr-2 text-red-200 cursor-pointer hover:scale-125 transition-all duration-300 ease-in-out'
      onClick={() => handleDelete(category.id)}
    />
  )
}
