import '@css/globals.css'
import SessionProvider from '@components/SessionProvider'
import { getServerSession } from 'next-auth'
// import { Inter } from 'next/font/google'
// const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'AJIMS employee management system',
  description: '',
}

export default async function RootLayout({ children }) {
  
  const session = await getServerSession()
  return (
    <html lang="en">
      <body /* className={inter.className} */>
        <SessionProvider session={session}>
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}
