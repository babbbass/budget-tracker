import { TransactionType, BudgetType } from "@/types"

export function totalAmount(tabToCalculate: TransactionType[] | BudgetType[]) {
  return tabToCalculate.reduce((total, obj) => {
    return total + obj.amount
  }, 0)
}

export function totalAmountByCategory(tabToCalculate: TransactionType[]) {
  return tabToCalculate.reduce((total, obj) => {
    return total + obj.amount
  }, 0)
}
