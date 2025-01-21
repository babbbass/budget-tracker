import type { Metadata } from "next"
import "./globals.css"
import { ClerkProvider } from "@clerk/nextjs"
import { frFR } from "@clerk/localizations"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { Toaster } from "sonner"
import { Inter, DM_Sans } from "next/font/google"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { ReactQueryProvider } from "@/providers/ReactQueryProvider"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import Head from "next/head"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "700"],
})

export const metadata: Metadata = {
  title: "BUDG’UP",
  description: "Votre assistant budgétaire personnalisé",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const user = await currentUser()

  if (!user) {
    redirect("/connexion")
  }
  return (
    <html lang='fr'>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='theme-color' content='#059669' />{" "}
        <link rel='manifest' href='/manifest.json' />
        <link rel='apple-touch-icon' href='/icons/icon.png' />{" "}
      </Head>
      <body className={`${inter.variable} ${dmSans.variable} antialiased `}>
        <ClerkProvider localization={frFR}>
          <main className='relative bg-emerald-900 text-slate-50 flex flex-col items-center min-h-screen max-w-[1440px] mx-auto'>
            <Navbar />
            <Toaster />
            <ReactQueryProvider>{children}</ReactQueryProvider>
            <Footer />
            <SpeedInsights />
          </main>
        </ClerkProvider>
      </body>
    </html>
  )
}
