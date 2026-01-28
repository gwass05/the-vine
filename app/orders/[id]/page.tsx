"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { Calendar, Package, Tag, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { getOrderDetails } from "@/lib/supabase/orders"
import { Button } from "@/components/ui/button"

import { useState, useEffect, use } from "react" // Added 'use'
import { useAuth } from "@/contexts/auth-context"
import type { OrderWithItems } from "@/lib/types";

type OrderDetailsPageProps = {
  params: {
    id: string
  } | Promise<{ id: string }> // Update type to reflect params potentially being a Promise
}

export default function OrderDetailsPage({ params: paramsProp }: OrderDetailsPageProps) {
  // Use React.use() to unwrap the params promise if it is one
  const params = typeof (paramsProp as Promise<any>)?.then === 'function'
    ? use(paramsProp as Promise<{ id: string }>)
    : paramsProp as { id: string };

  const router = useRouter()
  const { user, loading: authLoading } = useAuth()
  const [order, setOrder] = useState<OrderWithItems | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.push(`/login?redirect=/orders/${params.id}`)
      } else {
        const fetchOrder = async () => {
          setLoading(true)
          const { order: fetchedOrder, error: fetchError } = await getOrderDetails(params.id)
          if (fetchError || !fetchedOrder || fetchedOrder.user_id !== user.id) {
            setError("Order not found or you don't have permission to view it.")
          } else {
            setOrder(fetchedOrder)
          }
          setLoading(false)
        }
        fetchOrder()
      }
    }
  }, [authLoading, user, params.id, router])

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background pt-20 lg:pt-28 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-10 w-10 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading order details...</p>
        </div>
      </div>
    )
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-background pt-20 lg:pt-28 flex items-center justify-center">
        <div className="max-w-md w-full px-6 py-10 bg-card rounded-2xl border border-border shadow-sm text-center">
          <h1 className="text-2xl font-serif font-bold text-foreground mb-3">Order Not Found</h1>
          <p className="text-muted-foreground mb-6">
            {error || "We couldn't find the order you were looking for, or you don't have permission to view it."}
          </p>
          <Link className="text-primary hover:underline" href="/orders">
            Back to my orders
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pt-20 lg:pt-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-3xl font-serif font-bold text-foreground">Order #{order.id.slice(0, 8)}</h1>
            <p className="text-muted-foreground mt-2">Details for your recent purchase</p>
          </div>
          <Link href="/orders">
            <Button variant="outline" className="rounded-full px-6">
              Back to Orders
            </Button>
          </Link>
        </div>

        <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
          <div className="p-6 md:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <Tag className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-1">Order ID</p>
                  <p className="text-sm font-mono font-bold">#{order.id.slice(0, 8)}</p>
                </div>
              </div>

              <div className="flex gap-8">
                <div>
                  <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-1 flex items-center gap-1">
                    <Calendar className="h-3 w-3" /> Date
                  </p>
                  <p className="text-sm font-semibold">
                    {new Date(order.created_at).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-1">Total</p>
                  <p className="text-sm font-bold text-primary">${order.total_amount.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-1">Status</p>
                  <span className={cn(
                    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider",
                    order.status === 'pending' ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                  )}>
                    {order.status}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-muted/30 px-6 py-4 md:px-8 md:py-6 border-t border-border">
            <h2 className="text-lg font-serif font-semibold text-foreground mb-6">Items in Order</h2>
            <div className="space-y-4">
              {order.order_items.map((item) => (
                <div key={item.id} className="flex items-center justify-between pb-4 border-b border-border last:border-0 last:pb-0">
                  <div className="flex items-center gap-4">
                    <div className="h-14 w-14 rounded-lg bg-secondary flex items-center justify-center text-xl text-primary/20">
                      ✦
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{item.product_name}</p>
                      <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="font-bold text-sm text-foreground">{(item.product_price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
