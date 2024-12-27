import { Mails } from "lucide-react"
import Link from "next/link"

export function AuthLogo() {
  return (
    <Link href={"/"}>
      <div className='flex flex-col items-center gap-2'>
        <div className='flex items-center justify-center text-slate-50 font-title italic'>
          <Mails className='mr-2 text-primary' />
          <span className='text-2xl md:text-3xl'>Enveloppes budgets</span>
        </div>
        <p className='text-base md:text-lg text-center text-slate-200'>
          Vos finances, simplifiées et organisées
        </p>
      </div>
    </Link>
  )
}
