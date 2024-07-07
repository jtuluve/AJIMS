"use client";

import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useFormStatus } from "react-dom";

export default function Home() {
  const { data: session } = useSession();
  if(session) redirect("/main")

  const [formData, setFormData] = useState({ id: "", password: "" });
  const [authStatus, setAuthStatus] = useState(null);
  const [pending, setPending] = useState(false)
  
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
  
  const handleChange = (e) => {
    e.preventDefault();
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

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
        </form>
      </div>
    </>
  );
}
