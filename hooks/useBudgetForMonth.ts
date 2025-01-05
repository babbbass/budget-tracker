// import { useQuery } from "@tanstack/react-query";
import { useBudgetsGenericForMonth } from "@/hooks/useBudgets"
import { useBudgetsForMonth } from "@/hooks/useMonths"

export const useBudgetForMonth = (email: string, month: string) => {
  const { data: budgets, isLoading: isBudgetsLoading } =
    useBudgetsGenericForMonth(email, month)
  const { data: budgetsForMonth, isLoading: isMonthLoading } =
    useBudgetsForMonth(email, month)

  // Combiner les données si disponibles
  const combinedData =
    budgets && budgetsForMonth ? { budgets, budgetsForMonth } : null

  return {
    data: combinedData,
    isLoading: isBudgetsLoading || isMonthLoading, // Loading est vrai si un des deux est encore en cours
  }
}
