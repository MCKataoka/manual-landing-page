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
      <head>
          <link
              rel="stylesheet"
              href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
              integrity="sha512-9usAa10IRO0HhonpyAIVpjrylPvoDwiPUiKdWk5t3PyolY1cOd4DSE0Ga+ri4AuTroPR5aQvXU9xC6qOPnzFeg=="
              crossOrigin="anonymous"
          />
      </head>
      <body suppressHydrationWarning={true}>
      <ReduxProvider>
        {children}
      </ReduxProvider>
      </body>
      </html>
  )
}