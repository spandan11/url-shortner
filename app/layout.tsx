import './globals.css'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import { Toaster } from 'react-hot-toast'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Url Shortner',
  description: 'Shortening Url has never been easier.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <h1 className="text-4xl font-bold text-center mt-12">Shorter</h1>
        {children}
        <Toaster
          position="bottom-right"
          reverseOrder={false}
        /> </body>
    </html>
  )
}
