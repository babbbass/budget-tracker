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
    <nav className='bg-emerald-900 px-4 py-2 md:px-8 sticky top-0 z-10 font-sans text-slate-50 flex min-w-[320px] w-full justify-between items-center mb-10 min-h-[50px] border-b border-slate-200'>
      <Logo />
      <SignedIn>
        {/* Menu desktop */}
        <div className='hidden lg:flex space-x-4'>
          <Link href={"/dashboard/settings"}>Mes enveloppes</Link>
          <Link href={"/mon-assistant"}>Assistant</Link>
          <Link href={"/budgets"}>Mon calendrier</Link>
          <Link href={"/epargnes"}>Mon Epargne</Link>
        </div>

        {/* Menu mobile */}
        <div className='lg:hidden bg-emerald-900 '>
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
            <Link
              href={"/dashboard/settings"}
              className='mb-4'
              onClick={toggleMobileMenu}
            >
              Mes enveloppes
            </Link>
            <Link
              href={"/mon-assistant"}
              className='mb-4'
              onClick={toggleMobileMenu}
            >
              Assistant
            </Link>
            <Link href={"/budgets"} className='mb-4' onClick={toggleMobileMenu}>
              Mon calendrier
            </Link>
            <Link
              href={"/epargnes"}
              className='mb-4'
              onClick={toggleMobileMenu}
            >
              Mon Epargne
            </Link>
          </div>
        </div>
        <div className='hidden lg:flex'>
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
