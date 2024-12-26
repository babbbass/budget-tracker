"use client"
import { Logo } from "@/components/Logo"
import { UserButton, SignedIn, SignedOut } from "@clerk/nextjs"
import Link from "next/link"
import React, { useState } from "react"
import { Button } from "./ui/button"
import { Menu, Logs } from "lucide-react"

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <nav className='bg-emerald-900 p-4 md:p-8 sticky top-0 z-10 font-sans text-slate-50 flex min-w-[320px] w-full justify-between items-center mb-10 h-[50px] border-b border-slate-200'>
      <Logo />
      <SignedIn>
        {/* Menu desktop */}
        <div className='hidden md:flex space-x-4'>
          <Link href={"/budgets"}>Mes enveloppes</Link>
          <Link href={"/dashboard"}>Récapitulatif</Link>
          <Link href={"/transactions"}>Mes Transactions</Link>
          {/* <Link href={"/epargnes"}>Mon Epargne</Link> */}
          <Link href={"/dashboard/settings"}>Reglages & Aide</Link>
        </div>

        {/* Menu mobile */}
        <div className='md:hidden bg-emerald-900 '>
          <button
            onClick={toggleMobileMenu}
            aria-label='Toggle menu'
            className='py-2'
          >
            {isMobileMenuOpen ? <Logs size={24} /> : <Menu size={24} />}
          </button>

          <div
            className={`fixed top-0 left-0 w-full h-full bg-emerald-900 shadow-lg z-50 flex flex-col p-5 transform transition-transform duration-800 ease-in-out ${
              isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div
              className='flex justify-between mb-6 '
              onClick={toggleMobileMenu}
            >
              <Logo />
              <button
                onClick={toggleMobileMenu}
                aria-label='Close menu'
                className='self-end mb-4'
              >
                <Logs size={24} />
              </button>
            </div>
            <div className='mb-2'>
              <UserButton />
            </div>
            <Link href={"/budgets"} className='mb-4' onClick={toggleMobileMenu}>
              Mes enveloppes
            </Link>
            <Link
              href={"/dashboard"}
              className='mb-4'
              onClick={toggleMobileMenu}
            >
              Récapitulatif
            </Link>
            <Link
              href={"/transactions"}
              className='mb-4'
              onClick={toggleMobileMenu}
            >
              Mes Transactions
            </Link>
            {/* <Link
              href={"/epargnes"}
              className='mb-4'
              onClick={toggleMobileMenu}
            >
              Mon Epargne
            </Link> */}
            <Link
              href={"/dashboard/settings"}
              className='mb-4'
              onClick={toggleMobileMenu}
            >
              Reglages & Aide
            </Link>
          </div>
        </div>
        <div className='hidden md:flex'>
          <UserButton />
        </div>
      </SignedIn>
      <SignedOut>
        <Link href={"/connexion"} className='btn'>
          <Button className='text-sm bg-emerald-600 hover:bg-emerald-700 transition-all'>
            Connexion
          </Button>
        </Link>
      </SignedOut>
    </nav>
  )
}
