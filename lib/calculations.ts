import { TransactionType } from "@/types"

export function totalAmount(tabToCalculate: TransactionType[]) {
  return tabToCalculate.reduce((total, obj) => {
    if (obj.type === "ADD") return total
    return total + obj.amount
  }, 0)
}

export function totalAmountByCategory(tabToCalculate: TransactionType[]) {
  return tabToCalculate.reduce((total, obj) => {
    return total + obj.amount
  }, 0)
}
