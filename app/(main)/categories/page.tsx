import React from "react"
import { getAllCategoriesByUser } from "@/lib/actionsCategory"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

export default async function Page() {
  // const { userId } = await auth()
  const user = await currentUser()
  if (!user) {
    redirect("/connexion")
  }
  const email = user.emailAddresses[0].emailAddress
  const categories = await getAllCategoriesByUser(email)
  console.log(categories)
  return <div className='flex flex-1 flex-col w-full md:w-1/2 gap-10'>page</div>
}
