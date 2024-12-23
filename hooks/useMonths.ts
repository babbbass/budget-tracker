import { useQuery } from "@tanstack/react-query"
import { findMonthPlanById } from "@/lib/actionsMonth"

export function useMonth(email: string, month: string) {
  return useQuery(
    ["month", [email, month]],
    () => findMonthPlanById(email, month),
    {
      staleTime: 0,
      cacheTime: 1000 * 60 * 5,
      refetchOnMount: true,
      refetchOnWindowFocus: true,
      enabled: !!month,
    }
  )
}
