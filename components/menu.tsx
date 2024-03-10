'use client'
import { getProfile } from '@/lib/mongoose/functions'
import { signOut, useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

export default function Menu() {
  const [user, setUser]: [user: any, setUser: any] = useState({})

  // useEffect(() => {
  //   setProfileUrl(localStorage.getItem('profileUrl'))
  // }, [])

  useEffect(() => {
    ;(async () => {
      let profile = await getProfile()
      setUser(profile)
    })()
    // setProfileUrl(localStorage.getItem('profileUrl'))
  }, [])

  const { data: session } = useSession()
  if (session)
    return (
      <>
        <div id="hideMenu" className="menu">
          <img
            src={user.profileUrl ? user.profileUrl : 'user.png'}
            alt="profile photo"
            className="profileImg"
          />
          <span id="getName" className="name">{user.name}</span>
          <div id="menuTabs" className="menuOptions">
            <a href="#research" className="active">
              Research
            </a>
            <a href="#academics">Academics</a>
            <a href="#professional">Professional</a>
            <a className="score" href="#scorepage">Score</a>
            <a className="logout" href="/main">
              Home
            </a>
          </div>
        </div>
      </>
    )
}
