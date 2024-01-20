"use client"
import Profile from "@/components/profile"
import "@css/main.css"
import { signOut, useSession } from "next-auth/react"

export default function Main() {
	

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
						<a href="">Faculty Details</a>
					</div>

				</div>
				<div className="profile">
					<div id="yourProfile" className="hidden-section">
						<a className="name2">Your Profile</a>
						<hr />
						<Profile/>
					</div>
				</div>
			</div>
		</>
	)
}