"use client"
import {signOut, useSession} from "next-auth/react"

export default function Menu() {
    const {data:session}=useSession()
    if(session)
    return (
        <>
            <div className="menu">
                <img src="user.png" alt="" className="profileImg" />
                <span className="name">Username</span>
                <div className="menuOptions">
                    <a className="active" href="#yourProfile">
                        Your Profile
                    </a>
                    <a href="#research">
                        Research
                    </a>
                    <a href="#academics">
                        Academics
                    </a>
                    <a href="#professional">
                        Professional
                    </a>
                    <a className="logout" onClick={()=>signOut()}>Logout</a>
                </div>
            </div>


        </>
    )
}
