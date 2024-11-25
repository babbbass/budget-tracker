import React from "react"
import Link from "next/link"
import { Logo } from "./Logo"

export function Header() {
  return (
    <div className='w-full'>
      <nav>
        <div className='w-full flex justify-between items-center'>
          <Logo />
          <Link
            href='/connexion'
            className='bg-blue-500 text-white px-4 py-2 rounded'
          >
            Essai gratuit
          </Link>
        </div>
      </nav>
      <header className='text-center py-20'>
        <h1 className='text-4xl font-bold mb-4'>
          Planificateur Budgétaire Intelligent
        </h1>
        <p className='text-xl mb-8'>
          Gérez vos finances personnelles comme un pro
        </p>
        <Link
          href='/connexion'
          className='bg-green-500 text-white px-6 py-3 rounded-lg text-lg'
        >
          Commencer gratuitement
        </Link>
      </header>
    </div>
  )
}
