import { TransactionType } from "@/types"

export function costTotalTransactions(transactions: TransactionType[]) {
  return transactions.reduce((total, transaction) => {
    return total + transaction.amount
  }, 0)
}
