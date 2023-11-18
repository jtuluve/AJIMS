"use client"
import '@css/page.css'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { useState, FormEventHandler } from 'react'
import { RedirectType } from 'next/navigation'
import { signIn } from 'next-auth/react'
export default function Home() {
  const { data: session } = useSession()
  if (session) redirect("/main", RedirectType.push)
  const [userInfo, setUserInfo] = useState({ id: "", password: "" });

  let [wrongCred, setWrongCred] = useState(false)
  const handleSubmit = async (e) => {
    // validate your userinfo
    e.preventDefault();

    const res = await signIn("credentials", {

      id: userInfo.id + '@ajims.com',
      password: userInfo.password,
      redirect: false
    });
    if (res?.status == 401) setWrongCred(true)
    else {
      setWrongCred(false)
    }
  };
  return (
    <>

      <div className="loginContainer">
        <a className="head">Faculty login</a>
        <hr />
        <form onSubmit={handleSubmit} method="POST">
          <label htmlFor="id"><b>ID</b></label>
          <input
            value={userInfo.id}
            onChange={({ target }) =>
              setUserInfo({ ...userInfo, id: target.value })
            }
            type="text"
            id="id"
            placeholder="id"
            required
          />

          <label htmlFor="password"><b>Password</b></label>
          <input
            value={userInfo.password}
            onChange={({ target }) =>
              setUserInfo({ ...userInfo, password: target.value })
            }
            type="password"
            id="password"
            placeholder="Enter Password"
          />
          {wrongCred && <span color='red'>Wrong Credentials</span>}
          <input type="submit" value="Login" disabled={(!userInfo.id || !userInfo.password)} />
        </form>
      </div>
    </>
  )
}
