import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"
import { ClerkProvider } from "@clerk/nextjs"
import { frFR } from "@clerk/localizations"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
})
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
})

export const metadata: Metadata = {
  title: "Mon planificateur budgétaire",
  description: "Realisé par Babbbass",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider localization={frFR}>
      <html lang='en'>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased `}
        >
          <main className='flex flex-col justify-center items-center min-h-screen bg-gradient-to-b from-blue-100 to-white p-2 py-4 max-w-[1440px] mx-auto'>
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  )
}
