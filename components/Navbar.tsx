"use client"
import { Logo } from "@/components/Logo"
import { UserButton, SignedIn, SignedOut } from "@clerk/nextjs"
import Link from "next/link"
import React from "react"
import { Button } from "./ui/button"

export function Navbar() {
  return (
    <nav className='flex p-2 min-w-[320px] w-full justify-between items-center mb-10 h-[50px] border-b mr-0'>
      <Logo />
      {/* <div className='flex justify-between items-center'> */}
      <div className='md:flex hidden mr-2'>
        <Link href={"/budgets"} className='btn'>
          Mes budgets
        </Link>
        <Link href={"/dashboard"} className='btn mx-4'>
          Tableau de bord
        </Link>
        <Link href={"/transactions"} className='btn'>
          Mes Transactions
        </Link>
      </div>
      {/* </div> */}

      <div className='md:hidden flex mt-2 justify-center'>
        <Link href={"/budgets"} className='btn btn-sm'>
          budgets
        </Link>
        <Link href={"/dashboard"} className='btn mx-4 btn-sm'>
          Tableau de bord
        </Link>
        {/* <Link href={"/transactions"} className='btn btn-sm'>
            Mes Transactions
          </Link> */}
      </div>
      <SignedIn>
        <UserButton />
      </SignedIn>
      <SignedOut>
        <Link href={"/connexion"} className='btn'>
          <Button className='text-sm bg-sky-600'>Se connecter</Button>
        </Link>
      </SignedOut>
    </nav>
  )
}