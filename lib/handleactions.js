"use server"
import { signIn } from 'next-auth/react'
import { signIn } from 'next-auth/react'
export const handleLogin = async (formData) => {
  // validate your userinfo
  const {id, password} = Object.fromEntries(formData)
  if(!id||!password) return "what??"
  const res = await signIn("credentials", {
    id,
    password,
    redirect: false
  });
  return res
};