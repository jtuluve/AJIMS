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
		<>
				<UserDataContextProvider data={data}>
					<FormstateContextProvider>{children}</FormstateContextProvider>
				</UserDataContextProvider>
		</>
	);
}
