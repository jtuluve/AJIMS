"use client";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import "@css/comingsoon.css";
export default function Appraisal() {
    // const { data: session } = useSession();
    // if (!session) {
    //     redirect("/");
    // }
    return (
        <>
            <div className="titlebar">
                <img alt="logo" src="/logo.jpg" className="logo" />
                <div className="information">
                    <h2>AJ Institute of Medical Sciences and Research centre</h2>
                    <h3>Employee Management System</h3>
                </div>
                <a className="clogout" href="/main">
                    Home
                </a>
            </div>
            <div className="comingsoon">
                Feature Comming Soon!
            </div>
        </>
    );
}
