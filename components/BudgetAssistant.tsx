"use client"
import React, { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

type Message = {
  id: string
  role: "user" | "assistant"
  content: string
}

export function BudgetAssistant({ userId }: { userId: string }) {
  const [question, setQuestion] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const askQuestion = async (e: React.FormEvent) => {
    console.log("askQuestion", question, userId)
    e.preventDefault()
    if (!question.trim() || !userId) return

    const newMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: question,
    }
    // console.log("newMessage", newMessage)
    // return
    setMessages((prev) => [...prev, newMessage])
    setIsLoading(true)

    try {
      const response = await fetch("/api/budget-assistant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question,
          userId,
        }),
      })

      if (!response.ok) {
        throw new Error("Erreur réseau")
      }

      const data = await response.json()

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.response,
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Erreur:", error)
      // Ajouter un message d'erreur à l'interface
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Désolé, une erreur s'est produite. Veuillez réessayer.",
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
      setQuestion("")
    }
  }

  return (
    <Card className='w-full max-w-2xl mx-auto p-4 bg-emerald-800 text-slate-50'>
      <div className='flex flex-col h-[500px]'>
        <div className='flex-1 overflow-y-auto mb-4 space-y-4'>
          {messages.map((message) => (
            <div
              key={message.id}
              className={`p-3 rounded-lg ${
                message.role === "user"
                  ? "bg-primary ml-auto max-w-[80%]"
                  : "bg-emerald-700 mr-auto max-w-[80%]"
              }`}
            >
              {message.content}
            </div>
          ))}
          {isLoading && (
            <div className='flex justify-center'>
              <Loader2 className='w-6 h-6 animate-spin' />
            </div>
          )}
        </div>

        <form onSubmit={askQuestion} className='flex gap-2'>
          <input
            type='text'
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder='Posez une question sur votre budget...'
            className='flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-slate-900'
            disabled={isLoading}
          />
          <Button type='submit' disabled={isLoading || !question.trim()}>
            Envoyer
          </Button>
        </form>
      </div>
    </Card>
  )
}
