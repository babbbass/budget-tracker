import { Mails } from "lucide-react"
import Link from "next/link"

export function Logo() {
  return (
    <Link href={"/"}>
      <div className='flex flex-col items-start gap-1 text-slate-50'>
        <div className='flex items-center  font-title italic'>
          <Mails className='mr-2 w-6 h-6 md:w-7 md:h-7 text-primary' />
          <span className='text-lg md:text-xl'>BUDG’UP</span>
        </div>
        <p className='text-xs text-center font-sans'>
          Vos finances, simplifiées et organisées
        </p>
      </div>
    </Link>
  )
}
