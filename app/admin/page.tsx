"use client";

import "@css/admin.css";
import React, { useState } from "react";
import { signOut } from "next-auth/react";
import { useAdminData } from "@/components/adminContext";
import Link from "next/link";

export default function Admin() {
	const { allUsers } = useAdminData();
	const [users, setUsers] = useState(allUsers);

	return (
		<section className="adminpage">
			<div className="titlebar">
				<img alt='logo' src="/logo.jpg" className="logo" />
				<a className="web-name">AJIMS Employment Management</a>
				<a
					title="logout"
					className="material-symbols-outlined logout"
					onClick={() => signOut()}
				>
					logout
				</a>
			</div>
			<div className="usersTable">
				<h2>Admin Dashboard</h2>
				<div className="button-container">
					<Link href={'/admin/firebase'}>
						<button>Login Credentials</button>
					</Link>
				</div>
				<div className="search-container">
					<input title="Search" type="search" name="search" onChange={e => {
						let a = allUsers.filter(user => new RegExp(`.*${e.target.value?.toLowerCase()}.*`).test(user?.profile?.department?.toLowerCase()) || new RegExp(`.*${e.target.value?.toLowerCase()}.*`).test(user?.name?.toLowerCase()));

						setUsers(a);
					}} placeholder="Search by name or department..." />
				</div>
				{allUsers.length ? (
					<table>
						<thead>
							<tr>
								<th scope="col">Sl no</th>
								<th scope="col">Profile</th>
								<th scope="col">Name</th>
								<th scope="col">Email</th>
								<th scope="col">Department</th>
								<th scope="col">Designation</th>
								<th scope="col">Actions</th>
							</tr>
						</thead>
						{users.map((user, index) => {
							const { uid } = user;
							return (
								<tbody key={uid} className="accordian">
									<tr>
										<td>{index + 1}</td>
										<td>
											<img
												src={(user?.profileUrl === '' || user?.profileUrl === 'user.png') ? '/user.png' : user.profileUrl}
												alt="profile"
												height={120}
												width={100}
											/>
										</td>
										<td>{user?.name}</td>
										<td>{user?.profile?.emailaddress}</td>
										<td>{user?.profile?.department}</td>
										<td>{user?.profile?.designation}</td>
										<td>
											<Link href={`/admin/${uid}`}>
												<button>view more</button>
											</Link>
										</td>
									</tr>
								</tbody>
							);
						})}
					</table>
				) : (
					<h3>Loading...</h3>
				)}
			</div>
		</section>
	);
}