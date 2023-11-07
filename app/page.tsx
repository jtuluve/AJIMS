"use client"
import Image from 'next/image'
import styles from '@css/page.module.css'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { useState, FormEventHandler } from 'react'
import { signIn } from 'next-auth/react'
export default function Home() {
  const { data: session } = useSession()
  if (session) redirect("/dashboard")
  const [userInfo, setUserInfo] = useState({ id: "", password: "" });
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    // validate your userinfo
    e.preventDefault();

    const res = await signIn("credentials", {

      id: userInfo.id,
      password: userInfo.password,
      redirect: false,
    });
    console.log(res)
  };
  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.loginContainer}>
          <form onSubmit={handleSubmit} method="POST">
            <label htmlFor="id"><b>ID</b></label>
            <input
              value={userInfo.id}
              onChange={({ target }) =>
                setUserInfo({ ...userInfo, id: target.value })
              }
              type="text"
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
              placeholder="Enter Password"
            />
            <input type="submit" value="Login" />
          </form>
        </div>
      </div>
    </>
  )
}
