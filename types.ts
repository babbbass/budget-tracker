export type SubCategoryType = {
  id: number
  name: string
  amount: number
  // emoji?: string | null
  categoryId: number
}
export type CategoryType = {
  id: number
  name: string
  subCategories: SubCategoryType[]
  userId?: number
}
