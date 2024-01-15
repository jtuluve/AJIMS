"use client"
import Menu from "@comp/menu"
import Profile from "@comp/profile"
import Research from "@comp/research"
import Academics from "@comp/academics"
import Professional from "@comp/professional"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import "@css/appraisal.css"
import Form from "@/components/form"
export default function Appraisal() {
    const { data: session } = useSession()
	if (!session) {
		redirect("/")
	}
    return (
        <>
            <div className="titlebar">
                <img src="/logo.jpg" className="logo" />
                <a className="web-name">AJIMS Employment Management</a>
            </div>
            <div className="menu-container">
                <Menu />
                <div className="menu2">
                    {/* <Profile /> */}
                    <Research />
                    <Academics />
                    <Professional />
                </div>
            </div>
            <script src="/js/dashboard.js" defer></script>
        </>
    )
}