import { createContext, useState } from "react"

const AuthContext = createContext(null)

export function  AuthContextProvider({children}){


   const [User, setUser] = useState(null)
   const [profile, setProfile] = useState(null)
   const [isLoading, setIsLoading] = useState(false)




}