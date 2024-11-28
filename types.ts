export type BudgetType = {
  id: string
  name: string
  amount: number
  categoryId: string
  transactions: TransactionType[]
}
export type CategoryType = {
  id: string
  name: string
  budgets: BudgetType[]
  userId?: string
}

export type TransactionType = {
  id: string
  amount: number
  description: string
  budgetId: string | null
  createdAt?: Date
  emoji?: string | null
  budgetName?: string
  name?: string
}
