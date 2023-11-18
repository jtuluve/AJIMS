"use client"
import "@css/main.css"
import { signOut, useSession } from "next-auth/react"
import { redirect } from 'next/navigation'
export default function Main() {
	const { data: session } = useSession({
		required: true,
		onUnauthenticated: () => redirect("/")
	})

	if (!session) {
		redirect("/")
	}

	return (
		<>
			<div className="titlebar">
				<img src="/logo.jpg" className="logo" />
				<div className="information">
					<h2>AJ Institute of Medical Sciences and Research centre</h2>
					<h3>Employee Management System</h3>
				</div>
				<a title="logout" className="material-symbols-outlined logout"
					onClick={() => signOut()}
				>
					logout
				</a>
			</div>
			<div className="wrapper">
				<div className="divisions">
					<div className="box">
						<img src="/user.png" />
						<a href="/appraisal">Faculty appraisal</a>
					</div>
					<div className="box">
						<img src="/leave.png" />
						<a href="">Apply Leave</a>
					</div>
					<div className="box">
						<img src="/tax.png" />
						<a href="">Tax Planning</a>
					</div>
					<div className="box">
						<img src="/paySlip.png" />
						<a href="">Pay Slip</a>
					</div>
					<div className="box">
						<img src="/insurance.png" />
						<a href="">Insurance</a>
					</div>

				</div>
				<div className="profile">
					<h1>Profile</h1>
					<hr />
					<h3>Name: Fake User</h3>
					<h3>Designation: Assistant Professor</h3>
					<h3>Department: Research</h3>
				</div>
			</div>
		</>
	)
}