import { createContext, useContext, useEffect, useState } from "react"
import { getUserProfile, onAuthChange } from "../lib/Auth"
import supabase from "../lib/supabase"

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



     // ✅ Logout sax ah
  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      setUser(null);
      setProfile(null);
      console.log("✅ Signed out successfully");

      // redirect optional (haddii aad rabto in uu ku celiyo sign in page)
      window.location.href = "/SignIn";
    } catch (error) {
      console.error("❌ Error signing out:", error.message);
    }
  };



    const value = {
        user,
        profile,
        isLoading,
        isLoggedIn: !!user,
        logout
      
        
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
