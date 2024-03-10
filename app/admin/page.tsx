"use client";
import "@css/admin.css";
import { NextResponse } from "next/server";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { getUsers, isAdmin } from "@/lib/mongoose/functions";
import { redirect, useRouter } from "next/navigation";

const Admin = () => {
	const [data, setData] = useState<any[]>([]);
	const {data: session} = useSession();
	if(!session) return redirect("/main");
	const router = useRouter()
	useEffect(() => {
		const fetchData = async () => {
			try {
				if(!(await isAdmin())) return router.replace("/main")
				const result = await getUsers();
				if (result) setData(JSON.parse(result));
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, []);

	const handleAccordian = (uid) => {
		const toggleElement = document.getElementById(uid);
		toggleElement.hidden
			? (toggleElement.hidden = false)
			: (toggleElement.hidden = true);
		// console.log(uid);
	};

	return (
		<section className="adminpage">
			<div className="titlebar">
				<img src="/logo.jpg" className="logo" />
				<a className="web-name">AJIMS Employment Management</a>
				<a
					title="logout"
					className="material-symbols-outlined logout"
					onClick={() => signOut()} //Sign out function not done
				>
					logout
				</a>
			</div>
			<div className="usersTable">
				<h2>Admin Dashboard</h2>
				{data.length ? (
					<table>
						<caption>Users</caption>
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

						{data.map((user, index) => {
							const { uid } = user;
							return (
								<tbody key={uid} className="accordian">
									<tr>
										<td>{index + 1}</td>
										<td>
											<img
												src={user?.profileUrl}
												alt=""
												height={120}
												width={100}
											/>
										</td>
										<td>{user?.name}</td>
										<td>{user?.email}</td>
										<td>{user?.department}</td>
										<td>{user?.designation}</td>
										{/* <td className="action-btn">
											<button>delete</button>
											<button>view more</button>
										</td> */}
										<td>
											<button
												onClick={() => {
													handleAccordian(uid);
												}}
											>
												v
											</button>
										</td>
									</tr>
									<tr id={uid} hidden>
										<td>hello</td>
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
};

export default Admin;
