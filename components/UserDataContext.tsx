"use client"

import { UserDocument } from "@/lib/mongoose/interface";
import { createContext, useContext, useEffect, useState } from "react"

export const UserDataContext = createContext({})
export default function UserDataContextProvider({data,children}){
  const [userData,setUserData] = useState(data);

  return(
    <UserDataContext.Provider value={{userData,setUserData}}>
      {children}
    </UserDataContext.Provider>
  )
}

export function useUserData(){
  const { userData, setUserData} = useContext(UserDataContext) as {userData:UserDocument|null|undefined, setUserData};

  return { userData, setUserData };
}