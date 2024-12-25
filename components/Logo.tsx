import { NotebookPen } from "lucide-react"
import Link from "next/link"

export function Logo() {
  return (
    <Link href={"/"}>
      <div className='flex items-center text-slate-200 font-title italic'>
        <NotebookPen className='mr-2' />
        <span className='text-basemd:text-2xl'>Enveloppes budgets</span>
      </div>
    </Link>
  )
}
