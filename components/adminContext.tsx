"use client";

import { UserDocument, AdminContextType } from "@/lib/mongoose/interface";
import { useContext, createContext, useState } from "react";

export const AdminContext = createContext<AdminContextType>({ users: [] });

export default function AdminContextProvider({
	data,
	children,
}: {
	data: UserDocument[];
	children: React.ReactNode;
}) {
	const [users, setUsers] = useState<UserDocument[]>(data);

	return (
		<AdminContext.Provider value={{ users }}>{children}</AdminContext.Provider>
	);
}

export function useAdminData() {
	const { users } = useContext(AdminContext);

	return { allUsers: users };
}
