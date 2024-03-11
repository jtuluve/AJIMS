"use client";
import Menu from "@comp/menu";
import Research from "@comp/research";
import Academics from "@comp/academics";
import Professional from "@comp/professional";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Scorepage from "@/components/scorepage";
import FormstateContextProvider from "@/components/formstateContext";
export default function Appraisal() {
  const { data: session } = useSession();
  if (!session) {
    redirect("/");
  }
  return (
    <>
      <link rel="stylesheet" href="css/appraisal.css?v=1.2.3" />
      <div className="titlebar">
        <a href="/" className="logo">
          <img src="/logo.jpg" style={{height:"100%"}}/>
        </a>
        <a className="web-name">AJIMS Employment Management</a>
      </div>
      <div className="menu-container">
        <Menu />
        <div id="onPrintScale" className="menu2">
          {/* <Profile /> */}
          <FormstateContextProvider> {/* Not used this context */}
            <Research />
            <Academics />
            <Professional />
            <Scorepage />
          </FormstateContextProvider>
        </div>
      </div>
      <script src="/js/dashboard.js" defer></script>
    </>
  );
}
