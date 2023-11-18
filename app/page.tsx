"use client"
import '@css/page.css'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
// import { useState, FormEventHandler } from 'react'
import { RedirectType } from 'next/navigation'
// import { useRouter } from 'next/router'
// import { signInWithCredential } from 'firebase/auth'
// import {handleLogin} from '@/lib/handleactions'
import { signIn } from 'next-auth/react'
import { revalidatePath } from 'next/cache'
import { useState } from 'react'



export default function Home() {

  const { data: session } = useSession()
  if (session) redirect("/main", RedirectType.push)
  const [authStatus, setAuthStatus] = useState(null)
  
  const handleLogin = async (formData) => {
    // validate your userinfo
    const { id, password } = Object.fromEntries(formData)
    if (!id || !password) return "what??"
    const res = await signIn("credentials", {
      id,
      password,
      redirect: false
    });
    if (res?.status == 401) setAuthStatus("Id and Password doesn't match. Try again.")
    else {
      setAuthStatus(null)
      revalidatePath("/")
    }
  };

  return (
    <>

      <div className="loginContainer">
        <form action={handleLogin} onSubmit={e=>e.preventDefault()}>
          <label htmlFor="id"><b>ID</b></label>
          <input
            name="id"
            type="text"
            id="id"
            placeholder="id"
            required
          />

          <label htmlFor="password"><b>Password</b></label>
          <input
            name='password'
            type="password"
            id="password"
            placeholder="Enter Password"
            required
          />
          {authStatus && <span color='red'>{authStatus}</span>}
          <input type="submit" value="Login" />
        </form>
      </div>
    </>
  )
}
