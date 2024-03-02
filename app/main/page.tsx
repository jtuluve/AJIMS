"use client"
import SideMenu from "@/components/SideMenu"
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
				<SideMenu/>
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