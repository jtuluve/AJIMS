"use client";
import SideMenu from "@/components/SideMenu";
import Form from "@/components/form";
import { getProfile } from "@/lib/mongoose/functions";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import "@css/main.css";
import Nav from "@/components/Nav";
import { useFormStateContext } from "@/components/formstateContext";
import { useUserData } from "@/components/UserDataContext";

export default function FacultyDetails() {
	let [profileData, updateProfileData]: [
		profileData: any,
		updateProfileData: any
	] = useState(false);
	let {formState,setFormState} = useFormStateContext();
	let {userData} = useUserData()
	const { data: session } = useSession();
	const [profileUrl, setProfileUrl] = useState("");
	
	if (!session) {
		redirect("/");
	}


	useEffect(() => {
		(async () => {
			let profile = userData?.profile;
			updateProfileData(profile);
			setProfileUrl(profile?.profileUrl);
			setFormState({type:"profile",data:profile})
		})();
		// setProfileUrl(localStorage.getItem('profileUrl'))
	}, [formState]);

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
