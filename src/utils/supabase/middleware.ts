import { createServerClient } from "@supabase/ssr";

// Mock Next.js middleware types for non-Next.js environments
type NextRequest = {
    headers: Headers;
    cookies: {
        getAll: () => { name: string; value: string }[];
        set: (name: string, value: string) => void;
    };
};

class NextResponse {
    static next(options?: any) {
        return new NextResponse();
    }
    cookies = {
        set: (name: string, value: string, options?: any) => {}
    };
}

const supabaseUrl = process.env.VITE_SUPABASE_URL || "https://zvesnisvnjzoulpzhzlj.supabase.co";
const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY || "sb_publishable_syIRWdR7X4b-xhtqrJxRiw_4xz9VSbf";

export const createClient = (request: NextRequest) => {
    // Create an unmodified response
    let supabaseResponse = NextResponse.next({
        request: {
            headers: request.headers,
        },
    });

    const supabase = createServerClient(
        supabaseUrl,
        supabaseKey,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
                    supabaseResponse = NextResponse.next({
                        request,
                    })
                    cookiesToSet.forEach(({ name, value, options }) =>
                        supabaseResponse.cookies.set(name, value, options)
                    )
                },
            },
        },
    );

    return supabaseResponse
};