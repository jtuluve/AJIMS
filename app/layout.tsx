import "@css/globals.css"
import Provider from '@components/sessionprovider'
import { getServerSession } from "next-auth"
export const metadata = {
  title: 'AJIMS employee management system',
  description: '',
}
export default async function RootLayout({ children }) {
  
  const session = await getServerSession()
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
      </head>
      <body /* className={inter.className} */>
        <Provider session={session}>
          {children}
        </Provider>
      </body>
    </html>
  )
}
