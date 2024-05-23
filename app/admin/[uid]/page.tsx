"use client";

import { useAdminData } from "@/components/adminContext";

const UserDetail = ({ params }) => {
	const { uid } = params;
	const { allUsers } = useAdminData();
	const user = allUsers.filter((unitUser) => uid === unitUser.uid);
	console.log(user[0]);

	return <div>User</div>;
};

export default UserDetail;
