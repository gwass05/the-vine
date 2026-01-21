import { createClient } from '@supabase/supabase-js'

// Client for use in client components
export const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// Export the same client with an alias for consistency
export const supabaseClient = supabase
