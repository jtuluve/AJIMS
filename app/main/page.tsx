"use client"
import {getProfile, updateProfile} from "@/lib/mongoose/functions"
import "@css/main.css"
import { signOut, useSession } from "next-auth/react"
import { redirect } from 'next/navigation'
import { useEffect, useLayoutEffect, useState } from "react"
export default function Main() {
	let [profileData,updateProfileData]=useState({})
	const { data: session } = useSession()
	if (!session) {
		redirect("/")
	}
	
	useEffect(()=>{
		(async()=>{
			let profile=await getProfile()
			updateProfileData(profile)
			// console.log(profile)
		})()
	},[])

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
						<div className="profileform">
							{/* <Form submitFunc={updateProfile} inputs={[
								{label:"Name",name:"name",type:"text",placeholder:"Enter Name",required:true},
								{name:"designation", label:"Designation",type:"text",placeholder:"Enter Designation",required:true},
								{name:"department", label:"Department",type:"text",placeholder:"Enter Department",required:true}
							]}/> */}
						</div>
					</div>
				</div>
			</div>
		</>
	)
}