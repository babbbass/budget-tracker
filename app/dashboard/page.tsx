import React from "react"
import { auth, currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { addUserToDB } from "@/lib/actionsUser"

export default async function Dashboard() {
  const { userId } = await auth()
  const user = await currentUser()
  console.log(user)

  if (!userId || !user) {
    redirect("/connexion")
  }

  const fullName = user.firstName + " " + user.lastName
  const email = user.emailAddresses[0].emailAddress

  //await addUserToDB(userId, fullName, email)
  return <div>Hello {email}</div>
}
