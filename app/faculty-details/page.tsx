"use client";
import SideMenu from "@/components/SideMenu";
import Form from "@/components/form";
import { getProfile } from "@/lib/mongoose/functions";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "@css/main.css";
import Nav from "@/components/Nav";

export default function FacultyDetails() {
	let [profileData, updateProfileData]: [
		profileData: any,
		updateProfileData: any
	] = useState(false);
	let router = useRouter();
	let [formState, setFormState]: [formState: any, setFormState: any] =
		useState(false);
	const { data: session } = useSession();
	if (!session) {
		router.push("/");
	}

	const [profileUrl, setProfileUrl] = useState("");

	function formStatusUpdate(state) {
		setFormState(state);
	}
	useEffect(() => {
		(async () => {
			let profile = await getProfile();
			updateProfileData(profile);
			setProfileUrl(profile.profileUrl);
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
					type="profile"
					formStatusUpdate={formStatusUpdate}
					_id={profileData["_id"] || ""}
				/>
			</div>
		</>
	);
}
