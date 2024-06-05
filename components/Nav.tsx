import { signOut } from "next-auth/react";
import Link from "next/link";
export default function Nav() {
	return (
		<div className="titlebar">
			<Link href="/" style={{height:"75%"}}>
				<img alt="logo" src="/logo.jpg" className="logo" />
			</Link>
			<div className="information">
				<h2>AJ Institute of Medical Sciences and Research centre</h2>
				<h3>Employee Management System</h3>
			</div>
			<a
				title="logout"
				className="material-symbols-outlined logout"
				onClick={() => signOut()}
			>
				logout
			</a>
		</div>
	);
}
