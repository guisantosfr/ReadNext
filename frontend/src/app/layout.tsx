import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/sonner"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ReadNext - Recomendações de Leitura",
  description: "Descubra sua próxima leitura favorita com recomendações personalizadas",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <main className="min-h-screen bg-background">{children}</main>
        <Toaster position="top-center"/>
      </body>
    </html>
  )
}
