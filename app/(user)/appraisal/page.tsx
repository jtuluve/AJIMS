"use client";

import Menu from "@comp/menu";
import Research from "@comp/research";
import Academics from "@comp/academics";
import Professional from "@comp/professional";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Scorepage from "@/components/scorepage";
import Form from "@/components/form";
import Link from "next/link";
import { useEffect } from "react";
import { useFormStateContext } from "@/components/formstateContext";

export default function Appraisal() {
  //if user not logged in, redirect to login page
  const { data: session } = useSession();
  const { setFormState } = useFormStateContext()
  if (!session) {
    redirect("/");
  }
  useEffect(()=>{
    setFormState({});
  },[])

  return (
    <>
      <link rel="stylesheet" href="css/appraisal.css?v=1.2.3" />
      <div className="titlebar">
        <Link href="/" className="logo">
          <img alt="logo" src="/logo.jpg" style={{height:"100%"}}/>
        </Link>
        <a className="web-name">AJIMS Employment Management</a>
      </div>
      <div className="menu-container">
        <Menu />
        <div id="onPrintScale" className="menu2">
          {/* <Profile /> */}
            <Form />
            <Research />
            <Academics />
            <Professional />
            <Scorepage />
        </div>
      </div>
      {/* <script src="/js/dashboard.js" defer></script> */}
    </>
  );
}
