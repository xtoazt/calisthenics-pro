import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { Toaster } from "@/components/ui/toaster"
import { PointsProvider } from "@/lib/points-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "CalisthenicsPro - Master Your Body",
  description: "Your journey to bodyweight mastery starts here.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PointsProvider>
          {children}
          <Toaster />
        </PointsProvider>
      </body>
    </html>
  )
}
