import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonyKey = import.meta.env.VITE_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseAnonyKey, {
    Auth: {
        Permissions: true,
        autoRefreshToken: true

    },
    realtime: {
        params: {
            eventsPerSecond: 10
        }

    }

})
export default supabase