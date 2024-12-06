import React from "react"
import { Card } from "./ui/card"
import { AddBudgetDialog } from "./addBudgetDialog"

export function FirstBudget({ email }: { email: string }) {
  return (
    <Card className='flex text-base flex-col justify-center items-center md:text-lg my-6 gap-4 p-2 py-4'>
      Créez votre première enveloppe en cliquant sur le bouton ci-dessous
      <AddBudgetDialog
        email={email}
        triggerSentence='+ Ma première enveloppe'
      />
    </Card>
  )
}
