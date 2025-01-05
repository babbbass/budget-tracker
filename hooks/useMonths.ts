import { useQuery } from "@tanstack/react-query"
import { findMonthPlanByEmail } from "@/lib/actionsMonth"

export function useBudgetsForMonth(email: string, month: string) {
  return useQuery(
    ["month", [email, month]],
    () => findMonthPlanByEmail(email, month),
    {
      staleTime: 0,
      cacheTime: 1000 * 60 * 5,
      refetchOnMount: true,
      refetchOnWindowFocus: true,
      enabled: !!month && !!email,
    }
  )
}
