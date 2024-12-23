export async function fetchCategoriesByUser(email: string) {
  const response = await fetch("/actions/getAllCategoriesByUser", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  })

  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des catégories")
  }

  return response.json()
}
