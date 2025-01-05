import { useQuery } from "@tanstack/react-query"
import {
  findAllBudgetByUser,
  getBudgetById,
  findBudgetsForMonth,
} from "@/lib/actionsBudget"

export function useBudgets(email: string) {
  return useQuery(["budgets", email], () => findAllBudgetByUser(email), {
    staleTime: 0,
    cacheTime: 1000 * 60 * 5,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    enabled: !!email,
  })
}

export function useBudgetsGenericForMonth(email: string, month: string) {
  return useQuery(
    ["budgetsGenericForMonth", [email, month]],
    () => findBudgetsForMonth(email, month),
    {
      staleTime: 0,
      cacheTime: 1000 * 60 * 5,
      refetchOnMount: true,
      refetchOnWindowFocus: true,
      enabled: !!email,
    }
  )
}

export function useBudgetById(budgetId: string) {
  return useQuery(["budget_by_id", budgetId], () => getBudgetById(budgetId), {
    staleTime: 0,
    cacheTime: 1000 * 60 * 5,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    enabled: !!budgetId,
  })
}
