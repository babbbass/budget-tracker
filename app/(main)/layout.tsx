import type { Metadata } from "next"
import "./globals.css"
import { ClerkProvider } from "@clerk/nextjs"
import { frFR } from "@clerk/localizations"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { Toaster } from "sonner"
import { Inter, DM_Sans } from "next/font/google"
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "700"],
})

export const metadata: Metadata = {
  title: "Mes enveloppes budgétaires",
  description: "Gérez vos budgets facilement.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider localization={frFR}>
      <html lang='fr'>
        <body className={`${inter.variable} ${dmSans.variable} antialiased `}>
          <main className='relative bg-gray-50 text-gray-800 flex flex-col items-center min-h-screen p-2 py-4 max-w-[1440px] mx-auto'>
            <Navbar />
            <Toaster />
            {children}
            <Footer />
            <SpeedInsights />
          </main>
        </body>
      </html>
    </ClerkProvider>
  )
}
