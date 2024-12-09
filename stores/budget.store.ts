import { create } from "zustand"
import { getBudgetById } from "@/lib/actionsBudget"
import { addTransactionToBudget } from "@/lib/actionsTransaction"
import { BudgetType } from "@/types"

type BudgetStore = {
  budget: BudgetType | null
  loading: boolean
  error: string | null
  fetchBudgets: (id: string) => Promise<void>
  addTransaction: (
    budgetId: string,
    amount: number,
    nameTransaction: string
  ) => Promise<string | null>
}
export const useBudgetStore = create<BudgetStore>((set) => ({
  budget: null,
  loading: false,
  error: null,

  fetchBudgets: async (id: string) => {
    set({ loading: true, error: null })
    try {
      const budget = await getBudgetById(id)
      //@ts-expect-error "error type unknown"
      set({ budget, loading: false })
    } catch (err: unknown) {
      //@ts-expect-error "error type unknown"
      set({ error: err.message, loading: false })
    }
  },

  //@ts-expect-error "error type unknown"
  addTransaction: async (budgetId, amount, nameTransaction) => {
    try {
      const newTransaction = await addTransactionToBudget(
        budgetId,
        amount,
        nameTransaction
      )
      // )
      // set((state) => ({
      //   budget: [...state.transactions, newTransaction],
      // }))
      // return "ok"
      if (newTransaction) {
        return "ok"
      }
    } catch (err) {
      //@ts-expect-error "error type unknown"
      set(() => ({ error: err.message }))
    }
  },
}))
