import { ClerkProvider } from "@clerk/nextjs"
import { frFR } from "@clerk/localizations"

import { AuthLogo } from "@/components/AuthLogo"
import "../(main)/globals.css"

export const metadata = {
  title: "Enveloppes budgets",
  description: "Vos finances, simplifiées et organisées",
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider localization={frFR}>
      <html lang='fr'>
        <body className='h-screen flex flex-col justify-center items-center gap-4 text-slate-50 font-sans bg-emerald-900 '>
          <AuthLogo />
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
