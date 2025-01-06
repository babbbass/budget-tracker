import { ChatOpenAI } from "@langchain/openai"
import { PromptTemplate } from "@langchain/core/prompts"
import { StringOutputParser } from "@langchain/core/output_parsers"
import { RunnableSequence } from "@langchain/core/runnables"
import { queryVectorStore } from "./vectorStore"
import { MemoryVectorStore } from "langchain/vectorstores/memory"

const PROMPT_TEMPLATE = `
Tu es un assistant financier spécialisé dans l'analyse budgétaire.
Utilise le contexte suivant pour répondre à la question de l'utilisateur:

Contexte:
{context}

Question: {question}

Instructions:
- Base ta réponse uniquement sur les informations fournies dans le contexte
- Si tu ne peux pas répondre avec certitude, indique-le clairement
- Fournis des conseils pratiques basés sur les données disponibles
- Utilise des chiffres précis quand ils sont disponibles
- Ne sois pas trop long dans tes réponses essayes de rester concis
- Si on te demande comment utiliser l'application dis lui d'aller creer c'est premiere enveloppes dans la page reglages et configuration ou il pourra creer c'est premiers enveloppes génériques et de ce rendre sur la mes enveloppes pour pouvoir les gerer pour chaque mois voulu.
- Si la question n'a aucun rapport avec la gestion budgetaire, dis-lui que tu ne peux pas aider avec cette question.
Réponse:`

export const createAssistantChain = () => {
  const llm = new ChatOpenAI({
    modelName: "gpt-4-turbo-preview",
    temperature: 0.7,
  })

  const prompt = PromptTemplate.fromTemplate(PROMPT_TEMPLATE)

  return RunnableSequence.from([
    {
      // ts-expect-error "type unknown"
      context: (input: { relevantDocs: unknown[]; question: string }) =>
        //  ts-expect-error "type unknown"
        input.relevantDocs
          .map((doc) => (doc as { pageContent: unknown }).pageContent)
          .join("\n"),
      // ts-expect-error "error type unknown"
      question: (input: { relevantDocs: unknown[]; question: string }) =>
        input.question,
    },
    prompt,
    llm,
    new StringOutputParser(),
  ])
}

export const processQuery = async (
  question: string,
  userId: string,
  vectorStore: MemoryVectorStore
) => {
  const relevantDocs = await queryVectorStore(vectorStore, question, userId)
  const chain = createAssistantChain()
  return await chain.invoke({ relevantDocs, question })
}
