import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Multi-language App',
  description: 'A Next.js app with multi-language support',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
