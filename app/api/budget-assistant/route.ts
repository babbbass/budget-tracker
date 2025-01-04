import { NextRequest, NextResponse } from "next/server"
import { indexUserData } from "@/lib/rag/vectorStore"
import { processQuery } from "@/lib/rag/budgetAssitant"

export async function POST(req: NextRequest) {
  try {
    const { question, userId } = await req.json()

    if (!question || !userId) {
      return NextResponse.json(
        { error: "Question et userId requis" },
        { status: 400 }
      )
    }

    const vectorStore = await indexUserData(userId)
    const response = await processQuery(question, userId, vectorStore)

    return NextResponse.json({ response })
  } catch (error) {
    console.error("Erreur:", error)
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    )
  }
}
