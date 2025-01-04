import { BudgetDocument } from "./types"
import { OpenAIEmbeddings } from "@langchain/openai"
import { MemoryVectorStore } from "langchain/vectorstores/memory"
import { getUserData } from "./db"

// Création du store avec embeddings
const createVectorStore = async () => {
  const embeddings = new OpenAIEmbeddings({
    openAIApiKey: process.env.OPENAI_API_KEY,
  })
  return new MemoryVectorStore(embeddings)
}

// Conversion des données en documents
const convertToDocuments = (
  {
    categories,
    budgets,
    transactions,
  }: Awaited<ReturnType<typeof getUserData>>,
  userId: string
): BudgetDocument[] => {
  return [
    ...categories.map((category) => ({
      id: category.id,
      content: `Catégorie: ${category.name} de type ${category.type}`,
      metadata: {
        type: "category" as const,
        categoryType: category.type,
        userId,
      },
    })),
    ...budgets.map((budget) => ({
      id: budget.id,
      content: `Budget: ${budget.name} de ${budget.amount}€ dans la catégorie ${budget.category.name}`,
      metadata: {
        type: "budget" as const,
        amount: budget.amount,
        categoryType: budget.category.type,
        userId,
      },
    })),
    ...transactions.map((transaction) => ({
      id: transaction.id,
      content: `Transaction: ${transaction.name} de ${transaction.amount}€ pour le budget ${transaction.budget.name}`,
      metadata: {
        type: "transaction" as const,
        amount: transaction.amount,
        date: transaction.createdAt,
        userId,
      },
    })),
  ]
}

export const indexUserData = async (userId: string) => {
  const userData = await getUserData(userId)
  const documents = convertToDocuments(userData, userId)
  const vectorStore = await createVectorStore()

  await vectorStore.addDocuments(
    documents.map((doc) => ({
      pageContent: doc.content,
      metadata: doc.metadata,
    }))
  )

  return vectorStore
}

export const queryVectorStore = async (
  vectorStore: MemoryVectorStore,
  question: string,
  userId: string,
  filters?: Partial<BudgetDocument["metadata"]>
) => {
  // @ts-expect-error "error type unknown"
  return await vectorStore.similaritySearch(question, 5, filters)
}
