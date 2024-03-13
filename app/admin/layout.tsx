// "use client"
import "@css/globals.css";
import SessionProvider from "@comp/sessionprovider";
import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/mongoose/functions";

//fetch all users, pass it to context

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  if(!session) return redirect("/")
  if(!(await isAdmin())) return redirect("/main")
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="title" content="AJIMS employee management system" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
        />
      </head>
      <body /* className={inter.className} */>
        {children}
      </body>
    </html>
  );
}
