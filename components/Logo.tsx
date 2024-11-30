import { NotebookPen } from "lucide-react"
import Link from "next/link"

export function Logo() {
  return (
    <Link href={"/"}>
      <div className='flex items-center text-emerald-700 font-bold italic'>
        <NotebookPen className='mr-2' />
        <span className='hidden md:flex'>Mon planificateur budgétaire</span>
      </div>
    </Link>
  )
}
