'use client'

import {  useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useUserData } from './UserDataContext'
import Link from 'next/link'

export default function Menu() {
  const [user, setUser]: [user: any, setUser: any] = useState({})
  const { data: session } = useSession()
  const {userData} = useUserData()

  useEffect(() => {
    setUser(userData?.profile)
  }, [])

  if (session)
    return (
      <>
        <div id="hideMenu" className="menu">
          <img
            src={user?.profileUrl ? user.profileUrl : 'user.png'}
            alt="profile photo"
            className="profileImg"
          />
          <span id="getName" className="name">{user.name}</span>
          <div id="menuTabs" className="menuOptions">
            <a href="#research" className="research">
              Research
            </a>
            <a href="#academics" className='academics'>Academics</a>
            <a href="#professional" className='professional'>Professional</a>
            <a className="score scorepage" href="#scorepage">Score</a>
            <Link className="logout" href="/main">
              Home
            </Link>
          </div>
        </div>
      </>
    )
}
