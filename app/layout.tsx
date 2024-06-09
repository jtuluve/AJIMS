// "use client"
import "@css/globals.css";
import SessionProvider from "@comp/sessionprovider";
import React from "react";
import { getServerSession } from "next-auth";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  //fetch user session
  const session = await getServerSession();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="title" content="AJIMS employee management system" />
        <link rel="icon" type="image/png" href="favicon.ico"/>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
        />
      </head>
      <body /* className={inter.className} */>
        {/* User session context */}
        <SessionProvider session={session}>{children}</SessionProvider>
        <div id="watermark">AJIMS</div>
      </body>
    </html>
  );
}
