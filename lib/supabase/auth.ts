import { supabase } from './client'
import type { User } from '@supabase/supabase-js'

export interface AuthError {
    message: string
}

export async function signUp(email: string, password: string): Promise<{ user: User | null; error: AuthError | null }> {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
    })

    if (error) {
        return { user: null, error: { message: error.message } }
    }

    return { user: data.user, error: null }
}

export async function signIn(email: string, password: string): Promise<{ user: User | null; error: AuthError | null }> {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) {
        return { user: null, error: { message: error.message } }
    }

    return { user: data.user, error: null }
}

export async function signOut(): Promise<{ error: AuthError | null }> {
    const { error } = await supabase.auth.signOut()

    if (error) {
        return { error: { message: error.message } }
    }

    return { error: null }
}

export async function getCurrentUser(): Promise<User | null> {
    const { data: { user } } = await supabase.auth.getUser()
    return user
}

export async function getSession() {
    const { data: { session } } = await supabase.auth.getSession()
    return session
}
