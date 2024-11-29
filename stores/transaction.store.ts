import { create } from "zustand"
import {
  getTransactionsByUser,
  addTransactionToBudget,
} from "@/lib/actionsTransaction"

export const useTransactionStore = create((set) => ({
  transactions: [],
  loading: false,
  error: null,

  // Charger les transactions via Server Action
  fetchTransactions: async () => {
    set({ loading: true, error: null })
    try {
      const transactions = await getTransactionsByUser(
        "babbbass23@gmail.com",
        "last30"
      )
      set({ transactions, loading: false })
    } catch (err) {
      set({ error: err.message, loading: false })
    }
  },

  // Ajouter une transaction via Server Action
  addTransaction: async (transaction) => {
    try {
      const newTransaction = await addTransactionToBudget(transaction)
      set((state) => ({
        transactions: [...state.transactions, newTransaction],
      }))
    } catch (err) {
      set((state) => ({ error: err.message }))
    }
  },
}))
