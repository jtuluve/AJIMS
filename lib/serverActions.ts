"use client"

import { signIn } from "next-auth/react";

//login
export const handleLogin = async (formData:FormData) => {
    const [ id, password ] = [formData.get("id"), formData.get("password")]
    if (!id || !password) return {ok:"false"};
    const res = await signIn(
      "credentials",
      {
        id,
        password,
        redirect: false,
      }
    );
    if (!res)
      return {ok:"false"};
    else {
      return {ok:"true"};
    }
  }