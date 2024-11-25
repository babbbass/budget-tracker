import { NotebookPen } from "lucide-react"

export function Logo() {
  return (
    <div className='flex items-center'>
      <NotebookPen className='mr-2' />
      <span>Mon planificateur budgétaire</span>
    </div>
  )
}
