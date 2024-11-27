export type SubCategoryType = {
  id: number
  name: string
  amount: number
  // emoji?: string | null
  categoryId: number
  transactions: TransactionType[]
}
export type CategoryType = {
  id: number
  name: string
  subCategories: SubCategoryType[]
  userId?: number
}

export type TransactionType = {
  id: string
  amount: number
  description: string
  // budgetId: number
  subCategoryId: number | null
  createdAt?: Date
  emoji?: string | null
}
