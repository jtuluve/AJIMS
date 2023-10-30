import '@css/globals.css'
import { Inter } from 'next/font/google'

// const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'AJIMS employee management system',
  description: '',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body /* className={inter.className} */>{children}</body>
    </html>
  )
}
