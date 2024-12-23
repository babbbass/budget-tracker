import { useQuery } from "@tanstack/react-query"
import { findAllBudgetByUser } from "@/lib/actionsBudget"

export function useBudgets(email: string) {
  return useQuery(["budgets", email], () => findAllBudgetByUser(email), {
    staleTime: 0, // Les données sont immédiatement considérées comme obsolètes
    cacheTime: 1000 * 60 * 5,
    refetchOnMount: true, // Refetch quand le composant est monté
    refetchOnWindowFocus: true, // Refetch quand la fenêtre reprend le focus
    enabled: !!email, // N'exécute la requête que si l'email est défini
  })
}
