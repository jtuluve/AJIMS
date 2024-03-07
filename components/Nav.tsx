import { signOut } from "next-auth/react";

export default function Nav(){
  return(
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
  )
}