"use client"
import "@css/admin.css"
import { NextResponse } from 'next/server';
import React, { useState, useEffect } from 'react';
import { signOut, useSession } from "next-auth/react"

async function getdata() {
    try {
        const res = await fetch("http://localhost:3000/api/posts", { cache: "no-store" });
        if (!res.ok) {
            throw new Error("Failed to fetch data from localhost.");
        }
        const data = await res.json(); 
        return data; 
    } catch (error) {
        console.error("Failed to fetch data from localhost. Using fallback URL.");
    }

    try {
        const fallbackRes = await fetch("https://ajims.vercel.app/api/posts", { cache: "no-store" });
        if (!fallbackRes.ok) {
            throw new Error("Failed to fetch data from fallback URL.");
        }
        const fallbackData = await fallbackRes.json();
        return fallbackData; 
    } catch (error) {
        console.error("Failed to fetch data from fallback URL.");
        return [];
    }
}


const Admin = () => {
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getdata();
                if (result) setData(result);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);
return(
    <div className='adminpage'>
        <div className="titlebar">
            <img src="/logo.jpg" className="logo" />
            <a className="web-name">AJIMS Employment Management</a>
            <a title="logout" className="material-symbols-outlined logout"
                onClick={() => signOut()}//Sign out function not done
            >
                logout
            </a>
        </div>
            {data.map((post,indexu) => (
                <div key={post?._id} className="admincontainer">
                    <h3>User {indexu+1}</h3>
                <div>
                    <h3>Email: {post?.email}</h3>
                    <img src={post?.profileUrl} alt={post?.name} />
                    <p>&nbsp;</p>
                    <p>UID: {post?.uid}</p>
                    <p>Department: {post?.department}</p>
                    <p>Designation: {post?.designation}</p>
                    <p>Name: {post?.name}</p>
                </div>
                <div>
                    {/* Appraisal Fields */}
                    <p>Research Score: {post?.appraisal?.research?.score?.score}</p>
                    <p>Research Category: {post?.appraisal?.research?.score?.category}</p>
                    <p>&nbsp;</p>
                    <p>Academics Score: {post?.appraisal?.academics?.score?.score}</p>
                    <p>Academics Category: {post?.appraisal?.academics?.score?.category}</p>
                    <p>&nbsp;</p>
                    <p>Professional Score: {post?.appraisal?.professional?.score?.score}</p>
                    <p>Professional Category: {post?.appraisal?.professional?.score?.category}</p>
                </div>
                <div>
                    {/* Publications */}
                    {post?.appraisal?.research?.publications?.map((publication, index) => (
                        <div key={index}>
                            <p>Publication {index + 1}:</p>
                            <p>Title: {publication?.title}</p>
                            <p>Journal Name: {publication?.journalName}</p>
                            <p>Quartile: {publication?.quartile}</p>
                            <p>Index: {publication?.index}</p>
                            <p>DOI: {publication?.doi}</p>
                            <p>Authorship: {publication?.authorship}</p>
                            <p>
                                Upload URL:{" "}
                                <a href={publication?.uploadUrl} download>
                                    View upload document
                                </a>
                            </p>
                            <p>Author: {publication?.author}</p>
                            <p>Volume: {publication?.volume}</p>
                            <p>Issue: {publication?.issue}</p>
                            <p>Year: {publication?.year}</p>
                            <p>Page Number: {publication?.pageNo}</p>
                            <p>&nbsp;</p>
                        </div>
                    ))}
                </div>
                <div>
                    {/* Academics Fields */}
                    <p>Teaching Hours: {post?.appraisal?.academics?.teaching?.hours}</p>
                    <p>Clinical Hours: {post?.appraisal?.academics?.teaching?.clinicalHours}</p>
                    <p>Students Feedback: {post?.appraisal?.academics?.teaching?.studentsFeedback}</p>
                </div>
                <div>
                    {/* Professional Fields */}
                    <p>Clinical Duty Patients: {post?.appraisal?.professional?.clinicalDuty?.patients}</p>
                    <p>Post Held Category: {post?.appraisal?.professional?.postHeld?.category}</p>
                </div>
                <div>
                    {/* Other Fields */}
                    <p>__v: {post?.__v}</p>
                </div>
            </div>

            ))}
    </div>
)
}
    

export default Admin;
