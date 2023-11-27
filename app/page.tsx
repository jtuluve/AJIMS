"use client"
import '@css/page.css'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { RedirectType } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { useState } from 'react'



export default function Home() {

  const { data: session } = useSession()
  if (session) redirect("/main", RedirectType.replace)

  //states
  const [formData, setFormData] = useState({ id: "", password: "" });
  const [authStatus, setAuthStatus] = useState(null)

  //event handlers
  const handleLogin = async (e) => {
    e.preventDefault();
    const { id, password } = formData
    if (!id || !password) return setAuthStatus("Fill all details!")
    const res = await signIn("credentials", {
      id,
      password,
      redirect: false
    });
    if (res?.status == 401) setAuthStatus("Id and Password doesn't match. Try again.")
    else {
      setAuthStatus(null)
    }
  };
  const handleChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }


  return (
    <>

      <div className="loginContainer">
        <a className="head">Faculty login</a>
        <hr />
        <form onSubmit={handleLogin}>
          <label htmlFor="id"><b>ID</b></label>
          <input
            name="id"
            type="text"
            id="id"
            placeholder="id"
            value={formData.id}
            onChange={handleChange}
            required
          />

          <label htmlFor="password"><b>Password</b></label>
          <input
            name='password'
            type="password"
            id="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {authStatus && <span style={{color:"black",fontSize:"small"}}>{authStatus}</span>}
          <input type="submit" value="Login" />
        </form>
      </div>
    </>
  )
}
