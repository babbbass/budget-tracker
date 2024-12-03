import { utils, writeFile } from "xlsx"
import { jsPDF } from "jspdf"
// import { saveAs } from "file-saver"

export interface BudgetType {
  id: string
  name: string
  amount: number
}

export interface CategoryType {
  name: string
  budgets: BudgetType[]
}

export const exportToExcel = (budgets: CategoryType[]) => {
  const data = budgets.flatMap((category) =>
    category.budgets.map((budget) => ({
      Catégorie: category.name,
      Budget: budget.name,
      Montant: `${budget.amount}€`,
    }))
  )

  const ws = utils.json_to_sheet(data)
  const wb = utils.book_new()
  utils.book_append_sheet(wb, ws, "Budgets")
  writeFile(wb, "budgets.xlsx")
}

export const exportToPDF = (budgets: CategoryType[]) => {
  const doc = new jsPDF()

  doc.setFontSize(20)
  doc.text("Rapport des Budgets", 20, 20)

  let yPosition = 40

  budgets.forEach((category) => {
    doc.setFontSize(16)
    doc.text(category.name, 20, yPosition)
    yPosition += 10

    category.budgets.forEach((budget) => {
      doc.setFontSize(12)
      doc.text(`${budget.name}: ${budget.amount}€`, 30, yPosition)
      yPosition += 7
    })

    yPosition += 5
  })

  doc.save("budgets.pdf")
}

export const exportToWord = (budgets: CategoryType[]) => {
  const content = `
<!DOCTYPE html>
<html>
<body>
  <h1>Rapport des Budgets</h1>
  ${budgets
    .map(
      (category) => `
    <h2>${category.name}</h2>
    ${category.budgets
      .map(
        (budget) => `
      <p>- ${budget.name}: ${budget.amount}€</p>
    `
      )
      .join("")}
  `
    )
    .join("")}
</body>
</html>
  `

  const blob = new Blob([content], { type: "application/msword" })
  console.log(blob)
  // saveAs(blob, "budgets.doc")
}
