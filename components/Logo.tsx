import { NotebookPen } from "lucide-react"
import Link from "next/link"

export function Logo() {
  return (
    <Link href={"/"}>
      <div className='flex items-center'>
        <NotebookPen className='mr-2' />
        <span className='hidden md:flex'>Mon planificateur budgétaire</span>
      </div>
    </Link>
  )
}
