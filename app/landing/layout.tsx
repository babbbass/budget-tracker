import type { Metadata } from "next"
// import localFont from "next/font/local"
import "../(main)/globals.css"

// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// })

export const metadata: Metadata = {
  title: "Mon planificateur budgétaire",
  description: "Transformez vos finances en un jeu d'enfant !",
}

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='fr'>
      <body>
        <main className='flex flex-col items-center min-h-screen p-2 py-4 max-w-[1440px] mx-auto'>
          {children}
        </main>
      </body>
    </html>
  )
}
