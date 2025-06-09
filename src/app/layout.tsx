import type { Metadata } from 'next'
import '../styles/fonts.css'
import './globals.css'
import ReduxProvider from '@/components/layout/ReduxProvider'

export const metadata: Metadata = {
  title: 'Manual - Be good to yourself',
  description: 'Hair loss treatment and wellness solutions',
}

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode
}) {
  return (
      <html lang="en">
      <body suppressHydrationWarning={true}>
      <ReduxProvider>
        {children}
      </ReduxProvider>
      </body>
      </html>
  )
}