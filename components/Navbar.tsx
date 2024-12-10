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
    <nav className='font-sans text-gray-600 flex p-2 min-w-[320px] w-full justify-between items-center mb-10 h-[50px] border-b'>
      <Logo />
      <SignedIn>
        {/* Menu desktop */}
        <div className='hidden md:flex space-x-4'>
          <Link href={"/budgets"} className='btn'>
            Mes enveloppes
          </Link>
          <Link href={"/dashboard"} className='btn'>
            Récapitulatif
          </Link>
          <Link href={"/transactions"} className='btn'>
            Mes Transactions
          </Link>
          <Link href={"/epargnes"} className='btn'>
            Mon Epargne
          </Link>
        </div>

        {/* Menu mobile */}
        <div className='md:hidden'>
          <button
            onClick={toggleMobileMenu}
            aria-label='Toggle menu'
            className='btn p-2'
          >
            {isMobileMenuOpen ? <Logs size={24} /> : <Menu size={24} />}
          </button>

          <div
            className={`fixed top-0 left-0 w-full h-full bg-white shadow-lg z-50 flex flex-col p-5 transform transition-transform duration-800 ease-in-out ${
              isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className='flex justify-between mb-6'>
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
            <Link
              href={"/budgets"}
              className='btn btn-lg mb-4'
              onClick={toggleMobileMenu}
            >
              Mes enveloppes
            </Link>
            <Link
              href={"/dashboard"}
              className='btn btn-lg mb-4'
              onClick={toggleMobileMenu}
            >
              Récapitulatif
            </Link>
            <Link
              href={"/transactions"}
              className='btn btn-lg mb-4'
              onClick={toggleMobileMenu}
            >
              Mes Transactions
            </Link>
            <Link
              href={"/epargnes"}
              className='btn mb-4'
              onClick={toggleMobileMenu}
            >
              Mon Epargne
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
