import supabase from "./Supabase";

export async function SignUpPage(email, password, username = "") {
    const {data, error} = await supabase.auth.updateUser({
        email: email,
        password:password,
        data: { hello: 'world' }
    })

}