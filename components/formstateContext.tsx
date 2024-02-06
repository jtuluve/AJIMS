"use client"

import { createContext, useContext, useState } from "react"

export const formContext = createContext({})
export default function FormstateContextProvider({children}){
  const [formState, setFormState]: [formState: { type?, _id? }, setFormState:any] = useState({type:"",_id:""});
  
    function changeFormState(state) {
        setFormState(state);
    }  
  return(
    <formContext.Provider value={{formState,changeFormState}}>
      {children}
    </formContext.Provider>
  )
}