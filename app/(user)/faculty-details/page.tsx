"use client";

import SideMenu from "@/components/SideMenu";
import Form from "@/components/form";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import "@css/main.css";
import Nav from "@/components/Nav";
import { useFormStateContext } from "@/components/formstateContext";
import { useUserData } from "@/components/UserDataContext";

export default function FacultyDetails() {
	let {formState,setFormState} = useFormStateContext();
	let {userData} = useUserData()
	const { data: session } = useSession();
	if (!session) {
		redirect("/");
	}

	useEffect(() => {
		if(formState?.submitted){
			location.reload();
		}
		let profile = userData?.profile;
		setFormState({type:"profile",data:profile})
		// setProfileUrl(localStorage.getItem('profileUrl'))
	}, [formState.type]);
	useEffect(()=>{
		setFormState({type:"profile",data:userData?.profile})
	},[])

	return (
		<>
			<Nav />
			<div className="wrapper">
				<SideMenu />
				<Form
					title="Update Profile"
					wrapperStyle={{
						color: "black",
						position: "relative",
						marginBlock: "10px",
						background: "white",
						height: "auto",
						boxSizing: "border-box",
						boxShadow: "1px 1px 5px black",
						margin: "1%",
						borderRadius: "15px",
					}}
					formStyle={{ width: "100%", boxShadow: "none", background: "none" }}
				/>
			</div>
		</>
	);
}
