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
    <>
        {children}
    </>
  );
}
