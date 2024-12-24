export type BudgetType = {
  id: string
  name: string
  amount: number
  categoryId: string
  category?: {
    name: string
  }
  startDate?: Date
  endDate?: Date
  transactions?: TransactionType[]
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
  createdAt: Date
  emoji?: string | null
  budgetName?: string
  name?: string
}

export enum CategoriesEnum {
  REVENUS = "Revenus",
  // DETTES = "Dettes",
  EPARGNES = "Épargnes",
  // INVESTISSEMENTS = "Investissements",
  DEPENSES_FIXES = "Dépenses fixes",
  DEPENSES_VARIABLES = "Dépenses variables",
}

export enum MonthsEnum {
  JANVIER,
  FEVRIER,
  MARS,
  AVRIL,
  MAI,
  JUIN,
  JUILLET,
  AOUT,
  SEPTEMBRE,
  OCTOBRE,
  NOVEMBRE,
  DECEMBRE,
}

export type MonthlyPlanType = {
  id: string
  month: number
  year: number
  userId: string
}
