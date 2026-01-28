import Link from "next/link"
import Stripe from "stripe"
import { createClient } from "@supabase/supabase-js"

type SuccessPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>
}

function getSupabaseServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url) throw new Error("NEXT_PUBLIC_SUPABASE_URL is not set")
  if (!serviceRole && !anon) throw new Error("Supabase key is not set")

  // Prefer service role for server-side updates (if available)
  return createClient(url, serviceRole ?? anon!)
}

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  const sp = (await searchParams) ?? {}
  const sessionId = Array.isArray(sp.session_id) ? sp.session_id[0] : sp.session_id

  if (!sessionId) {
    return (
      <div className="min-h-screen bg-background pt-20 lg:pt-28 flex items-center justify-center">
        <div className="max-w-md w-full px-6 py-10 bg-card rounded-2xl border border-border shadow-sm text-center">
          <h1 className="text-2xl font-serif font-bold text-foreground mb-3">Missing session</h1>
          <p className="text-muted-foreground mb-6">
            We couldn’t verify your payment because the Stripe session ID was missing.
          </p>
          <Link className="text-primary hover:underline" href="/checkout">
            Return to checkout
          </Link>
        </div>
      </div>
    )
  }

  const stripeSecretKey = process.env.STRIPE_SECRET_KEY
  if (!stripeSecretKey) throw new Error("STRIPE_SECRET_KEY is not set")

  const stripe = new Stripe(stripeSecretKey, { apiVersion: "2025-02-24.acacia" })
  const session = await stripe.checkout.sessions.retrieve(sessionId)
  const orderId = session.metadata?.orderId

  if (!orderId) {
    return (
      <div className="min-h-screen bg-background pt-20 lg:pt-28 flex items-center justify-center">
        <div className="max-w-md w-full px-6 py-10 bg-card rounded-2xl border border-border shadow-sm text-center">
          <h1 className="text-2xl font-serif font-bold text-foreground mb-3">Payment received</h1>
          <p className="text-muted-foreground mb-6">
            Your payment was successful, but we couldn’t link it to an order. Please contact support.
          </p>
          <Link className="text-primary hover:underline" href="/orders">
            View orders
          </Link>
        </div>
      </div>
    )
  }

  // Mark order as paid in Supabase
  const supabase = getSupabaseServerClient()
  await supabase.from("orders").update({ status: "paid" }).eq("id", orderId)

  return (
    <div className="min-h-screen bg-background pt-20 lg:pt-28 flex items-center justify-center">
      <div className="max-w-md w-full px-6 py-10 bg-card rounded-2xl border border-border shadow-sm text-center">
        <h1 className="text-3xl font-serif font-bold text-foreground mb-3">Payment successful</h1>
        <p className="text-muted-foreground mb-8">
          Thanks! Your payment was received and your order is now marked as paid.
        </p>
        <div className="space-y-3">
          <Link href="/orders" className="inline-block w-full">
            <span className="inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-3 text-primary-foreground font-semibold">
              View your orders
            </span>
          </Link>
          <Link className="block text-sm text-primary hover:underline" href="/shop">
            Continue shopping
          </Link>
        </div>
      </div>
    </div>
  )
}

