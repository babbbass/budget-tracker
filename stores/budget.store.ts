// import { create } from "zustand"
// import { findAllBudgetByUser } from "@/lib/actionsBudget" // Adjust the import path

// Define types based on your Prisma schema
// interface Budget {
//   monthlyPlan: {
//     month: number
//     year: number
//   }
//   name: string
//   id: string
//   amount: number
//   categoryId: string
// }

// interface Category {
//   id: string
//   name: string
//   budgets: Budget[]
// }

// interface UserWithBudgets {
//   id: string
//   email: string
//   categories: Category[]
//   // Add other user fields as needed
// }

// interface BudgetStore {
//   budgets: UserWithBudgets | null
//   isLoading: boolean
//   error: Error | null
//   fetchBudgets: (email: string) => Promise<void>
// }

// export const useBudgetStore = create<BudgetStore>((set) => ({
//   budgets: null,
//   isLoading: false,
//   error: null,

//   fetchBudgets: async (email: string) => {
//     set({ isLoading: true, error: null })
//     try {
//       const userBudgets = await findAllBudgetByUser(email)
//       set({ budgets: userBudgets, isLoading: false })
//     } catch (error) {
//       set({
//         error:
//           error instanceof Error ? error : new Error("Failed to fetch budgets"),
//         isLoading: false,
//       })
//     }
//   },
// }))
