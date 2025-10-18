import { createContext, useContext, useEffect, useState } from "react"
import { getUserProfile, onAuthChange } from "../lib/Auth"

const AuthContext = createContext(null)

export function  AuthProvider({children}){


   const [user, setUser] = useState(null)
   const [profile, setProfile] = useState(null)
   const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {

        const cleanUp = onAuthChange(async (user) => {

            setUser(user);

            if (user) {

                try {
                    const userProfile = await getUserProfile(user.id);
                    setProfile(userProfile);
                } catch (error) {
                    console.error("Error fetching user profile: ", error)
                }

            } else {
                setProfile(null)
            }
            setIsLoading(false)
        })

        return cleanUp;

    }, [])



    // const logout = async () => {
    //     try {
    //         await signOut()
    //     } catch (error) {
    //         console.error('Error signing out:', error)
    //     }
    // }



    const value = {
        user,
        profile,
        isLoading,
        isLoggedIn: !!user
      
        
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )


}

export function useAuth() {

    const context = useContext(AuthContext);

    if (context === null) {
        throw new Error("useAuth must be used within and AuthProvider")
    }

    return context;
}