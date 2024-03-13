// "use client"
import "@css/globals.css";
import SessionProvider from "@comp/sessionprovider";
import React from "react";
import { getServerSession } from "next-auth";
import { getUserObject, isAdmin } from "@/lib/mongoose/functions";
import UserDataContextProvider from "@/components/UserDataContext";
import { redirect } from "next/navigation";
import { UserDocument } from "@/lib/mongoose/interface";
import FormstateContextProvider from "@/components/formstateContext";

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await getServerSession();
	if (!session) return redirect("/");
	if (await isAdmin()) redirect("/admin");
	const data = (await getUserObject()) as UserDocument;

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
				<UserDataContextProvider data={data}>
					<FormstateContextProvider>{children}</FormstateContextProvider>
				</UserDataContextProvider>
			</body>
		</html>
	);
}
