// "use client"
import "@css/globals.css";
import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { isAdmin, getUsers } from "@/lib/mongoose/functions";
import AdminContextProvider from "@/components/adminContext";

//fetch all users, pass it to context

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await getServerSession();
	if (!session) return redirect("/");
	if (!(await isAdmin())) return redirect("/main");
	const result = await getUsers();
	const data = result && JSON.parse(result);

	return (
		<>
			<AdminContextProvider data={data}>{children}</AdminContextProvider>
		</>
	);
}
