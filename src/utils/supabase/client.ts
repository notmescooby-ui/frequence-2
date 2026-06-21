import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://zvesnisvnjzoulpzhzlj.supabase.co";
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || "sb_publishable_syIRWdR7X4b-xhtqrJxRiw_4xz9VSbf";

export const createClient = () =>
    createBrowserClient(
        supabaseUrl,
        supabaseKey,
    );