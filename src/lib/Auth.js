import supabase from "./Supabase";

export async function SignUpPage(email, password, username = "") {
    const {data, error} = await supabase.auth.updateUser({
        email: email,
        password:password,
        data: { hello: 'world' }
    })

    
      if(data?.user) {
        // hduu session jiro nasii 

        const { data : sessionData } = await supabase.auth.getSession()

        if(!sessionData?.session) {
            // hdii uusan jirin session 
            console.log('No active session yet - profile will be created on first sign in')
            // date nosoo celi 
            return data;
        }
    
     // qeybta magaca username text avater_url
      const displayName = username || email.split("@")[0];

    //   create profile

    const {data: profileData, error : profileError } = await supabase
    
        .from('users')
        .insert({
            id: data.user.id,
            username: displayName,
            avatar_url: null
        })
        .select()
        .single()

        if(profileError){
            console.error("profile creation error:", profileError)
        }else{
            console.log("Profile created successfully", profileData)
        }

    }

    return data



}

