"use client";

import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { isAdmin } from "@/lib/mongoose/functions";

export default function Home() {
  const { data: session } = useSession();
  if(session) redirect("/main")

  //states
  const [formData, setFormData] = useState({ id: "", password: "" });
  const [authStatus, setAuthStatus] = useState(null);
  const [pending, setPending] = useState(false)
  /* event handlers */
  //login event handler
  const handleLogin = async (e) => {
    e.preventDefault();
    setPending(true)
    const { id, password } = formData;
    if (!id || !password) return setAuthStatus("Fill all details!");
    const res = await signIn("credentials", {
      id,
      password,
      redirect: false,
    });
    if (res.status == 200) setAuthStatus(null);
    else {
      setAuthStatus("Id and Password doesn't match. Try again.");
    }
    setPending(false)
  };
  // update formdata to state
  const handleChange = (e) => {
    e.preventDefault();
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  //submit button component
  function SubmitButton() {
    const { pending } = useFormStatus();
    return (
      <input type="submit" value={pending?"Logging in...":"Login"} />
    );
  }

  return (
    <>
      <link rel="stylesheet" href="css/page.css?v=1.0.0" />
      <div className="loginContainer">
        <a className="head">Faculty login</a>
        <hr />
        <form onSubmit={handleLogin}>
          <label htmlFor="id">
            <b>ID</b>
          </label>
          <input
            name="id"
            type="text"
            id="id"
            placeholder="id"
            value={formData.id}
            onChange={handleChange}
            autoComplete="off"
            required
          />

          <label htmlFor="password">
            <b>Password</b>
          </label>
          <input
            name="password"
            type="password"
            id="password"
            placeholder="Enter Password"
            autoComplete="off"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {authStatus && (
            <span style={{ color: "black", fontSize: "small" }}>
              {authStatus}
            </span>
          )}
          <input type="submit" value={pending?"Logging in..":"Login"} />
          {/* <SubmitButton/> */}
        </form>
      </div>
    </>
  );
}
