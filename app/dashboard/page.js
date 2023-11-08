"use client"
import Menu from "@components/menu"
import Profile from "@components/profile"
import Research from "@components/research"
import Academics from "@components/academics"
import Professional from "@components/professional"
import "@css/dashboard.css"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
export default function Dashboard(){
    const { data: session } = useSession({ required: true,onUnauthenticated(){
        redirect("/")
    }})
    if(!session) redirect("/")
    return(
        <div className="menu-container">
            <Menu/>
            <div className="menu2">
                <Profile/>
                <Research/>
                <Academics/>
                <Professional/>
            </div>
        </div>
    )
}

Dashboard.requireAuth = true