import supabase from "./Supabase";

export async function SignUpPage(email, password, username = "") {
    // 1️⃣ Register user
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
        console.error("Sign up error:", error);
        return null;
    }

    // 2️⃣ Haddii user la sameeyay
    if (data.user) {
        const displayName = username || email.split("@")[0];

        // 3️⃣ Save profile info
        const { data: profileData, error: profileError } = await supabase
            .from("users")
            .insert({
                id: data.user.id,
                username: displayName,
                avatar_url: null,
            })
            .select()
            .single();

        if (profileError) {
            console.error("Profile creation error:", profileError);
        } else {
            console.log("Profile created successfully", profileData);
        }
    }

    return data;
}

export async function signIn(email, password) {

    let { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
    })

    console.log("user info ", data)

    if (error) throw error

    //   check if user profile exists , create if it doesn't

    if (data?.user) {
        try {
            const profile = await getUserProfile(data.user.id);
            console.log("profile info ", profile)
        } catch (profileError) {
            console.error('Error with profile during signin:', profileError)
        }
    }
}


export async function getUserProfile(userId) {


    const { data: sessionData } = await supabase.auth.getSession()

    const { data, error } = await supabase.from('users')
        .select("*")
        .eq("id", userId)
        .single()

    // if user doest exist , create new one 

    if (error && error.code === "PGRST116") {
        console.log('No profile found, attempting to create one for user:', userId)



        // get user email to drive username if needed

        const { data: userData } = await supabase.auth.getUser();

        console.log("true data", userData)

        const email = userData?.user.email;


        // mchamuuda @ gmail.com

        const defaultUsername = email ? email.split("@")[0] : `user_${Date.now()}`;


        // create profile 

        const { data: newProfile, error: profileError } = await supabase

            .from('users')
            .insert({
                id: userId,
                username: defaultUsername,
                avatar_url: null
            })
            .select()
            .single()

        if (profileError) {
            console.error("profile creation error:", profileError)
            throw profileError
        } else {
            console.log("Profile created successfully", newProfile)
        }

        return newProfile
    }


    // general error 
    if (error) {
        console.error('Error fetching profile:', error)
        throw error
    }

    console.log("exiting profile")

    return data
}


export function onAuthChange(callback){

    const { data } = supabase.auth.onAuthStateChange((event, session) => {
            callback(session?.user || null, event)
    })

    return () => data.subscription.unsubscribe();
}
