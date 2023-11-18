"use client"
import Menu from "@components/menu"
import Profile from "@components/profile"
import Research from "@components/research"
import Academics from "@components/academics"
import Professional from "@components/professional"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import "@css/appraisal.css"
export default function Dashboard() {
    const { data: session } = useSession({
        required: true, onUnauthenticated() {
            redirect("/")
        }
    })
    if (!session) redirect("/")
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

Dashboard.requireAuth = true