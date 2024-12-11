import { ClerkProvider } from "@clerk/nextjs"
import { frFR } from "@clerk/localizations"

import { Logo } from "@/components/Logo"
import "../(main)/globals.css"

export const metadata = {
  title: "Mes enveloppes budgétaires",
  description: "Gérez vos budgets facilement.",
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider localization={frFR}>
      <html lang='fr'>
        <body className='h-screen flex flex-col justify-center items-center gap-4 text-3xl'>
          <Logo />
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
