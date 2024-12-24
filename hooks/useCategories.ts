import { useQuery } from "@tanstack/react-query"
import { getAllCategoriesByUser } from "@/lib/actionsCategory"

export function useCategories(email: string) {
  return useQuery(["categories", email], () => getAllCategoriesByUser(email), {
    staleTime: 0,
    cacheTime: 1000 * 60 * 5,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    enabled: !!email,
  })
}
