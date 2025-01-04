export type BudgetDocument = {
  id: string
  content: string
  metadata: {
    type: "budget" | "category" | "transaction" | "monthlyPlan"
    categoryType?: string
    amount?: number
    date?: Date
    userId: string
  }
}
