"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import "@css/comingsoon.css";
import Link from "next/link";
export default function Appraisal() {
    const { data: session } = useSession();
    if (!session) {
        redirect("/");
    }
    return (
        <>
            <div className="titlebar">
                <img alt="logo" src="/logo.jpg" className="logo" />
                <div className="information">
                    <h2>AJ Institute of Medical Sciences and Research centre</h2>
                    <h3>Employee Management System</h3>
                </div>
                <Link className="clogout" href="/main">
                    Home
                </Link>
            </div>
            <div className="comingsoon">
                Feature Comming Soon!
            </div>
        </>
    );
}
