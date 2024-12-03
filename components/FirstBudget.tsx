import React from "react"
import { Card } from "./ui/card"
import { AddBudgetDialog } from "./addBudgetDialog"

export default function FirstBudget({ email }: { email: string }) {
  return (
    <Card className='flex flex-col justify-center items-center text-lg my-6 gap-4 p-2'>
      Créez votre premier budget en cliquant sur le bouton ci-dessous
      {/* <Button className='ml-2 bg-emerald-600 hover:bg-emerald-700 transition-all transition-duration-300 text-white'>
        + Mon premier budget
      </Button> */}
      <AddBudgetDialog email={email} triggerSentence='+ Mon premier budget' />
    </Card>
  )
}
