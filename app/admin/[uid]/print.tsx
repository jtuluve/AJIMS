"use client";

import { useState, useEffect } from "react";
import { useAdminData } from "@/components/adminContext";
import '@css/print[uid].css'
import "@css/admin.css";

const PrintDetails = ({ params }) => {
    const { uid } = params;
    const { allUsers } = useAdminData();
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (allUsers.length > 0) {
            const fetchedUser = allUsers.find((unitUser) => unitUser.uid === uid);
            setUser(fetchedUser);
        }
    }, [allUsers, uid]);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="page-container">
            <div className="page">
                
            </div>
            <div className="page">
                
            </div> 
            <div>

            </div>
            <div className="page">

            </div> 
            <div className="page">

            </div>        
        </div>
    );
};

export default PrintDetails;
