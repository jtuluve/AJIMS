"use client"
import Nav from "@/components/Nav"
import SideMenu from "@/components/SideMenu"
import Profile from "@/components/profile"
import { isAdmin } from "@/lib/mongoose/functions"
import { signOut, useSession } from "next-auth/react"
import { redirect, useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Main() {
// 	const { data: session } = useSession();
// 	const router = useRouter()
//   if (!session) redirect("/");
// 	useEffect(()=>{
// 		(async()=>{
// 			if((await isAdmin())) return router.replace("/admin")
// 		})()
// 	})

	return (
		<>
			<link rel="stylesheet" href="css/main.css?v=1.0.2" />
			<Nav/>
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