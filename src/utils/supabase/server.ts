import { createServerClient } from "@supabase/ssr";

const supabaseUrl = process.env.VITE_SUPABASE_URL || "https://zvesnisvnjzoulpzhzlj.supabase.co";
const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY || "sb_publishable_syIRWdR7X4b-xhtqrJxRiw_4xz9VSbf";

export const createClient = (cookieStore?: any) => {
    return createServerClient(
        supabaseUrl,
        supabaseKey,
        {
            cookies: {
                getAll() {
                    if (!cookieStore) return [];
                    const all = cookieStore.getAll();
                    return Array.isArray(all) ? all.map((c: any) => ({ name: c.name, value: c.value })) : [];
                },
                setAll(cookiesToSet) {
                    if (!cookieStore) return;
                    try {
                        cookiesToSet.forEach(({ name, value, options }) => {
                            cookieStore.set(name, value, options);
                        });
                    } catch {
                        // The `setAll` method was called from a Server Component.
                        // This can be ignored if you have middleware refreshing
                        // user sessions.
                    }
                },
            },
        },
    );
};