"use client"

import { createContext, useContext, useEffect, useState } from "react"

export const formContext = createContext({});

export default function FormstateContextProvider({children}){
  const [formState, setFormState]= useState<{type?:string, _id?:string, data?, submitted?:boolean}>({type:"",_id:""});

  return(
    <formContext.Provider value={{formState,setFormState}}>
      {children}
    </formContext.Provider>
  )
}

export function useFormStateContext(){
  return useContext(formContext) as {formState: { type?, _id?, data?, submitted?:boolean }, setFormState:(state:{ type?, _id?, data?, submitted?:boolean })=>void}
}