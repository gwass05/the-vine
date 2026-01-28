"use client"

import { useState, useEffect } from "react"
import { ProtectedRoute } from "@/components/protected-route"
import { useAuth } from "@/contexts/auth-context"
import { getUserOrders } from "@/lib/supabase/orders"
import type { OrderWithItems } from "@/lib/types"
import { ShoppingBag, Package, Calendar, Tag, ChevronRight, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function OrdersPage() {
    const { user } = useAuth()
    const [orders, setOrders] = useState<OrderWithItems[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        if (user && mounted) {
            fetchOrders()
        }
    }, [user, mounted])

    const fetchOrders = async () => {
        if (!user) return
        setLoading(true)
        const { orders: fetchedOrders, error: fetchError } = await getUserOrders(user.id)
        if (fetchError) {
            setError(fetchError)
        } else {
            setOrders(fetchedOrders)
        }
        setLoading(false)
    }

    if (!mounted) return null

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-background pt-20 lg:pt-28">
                <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                        <div>
                            <h1 className="text-3xl font-serif font-bold text-foreground">My Orders</h1>
                            <p className="text-muted-foreground mt-2">Manage and track your shopping history</p>
                        </div>
                        <Link href="/shop">
                            <Button variant="outline" className="rounded-full px-6">
                                Keep Shopping
                            </Button>
                        </Link>
                    </div>

                    {loading ? (
                        <div className="text-center py-20 bg-card rounded-2xl border border-border">
                            <Loader2 className="h-10 w-10 animate-spin text-primary mx-auto mb-4" />
                            <p className="text-muted-foreground">Fetching your order history...</p>
                        </div>
                    ) : error ? (
                        <div className="text-center py-20 bg-destructive/5 rounded-2xl border border-destructive/20">
                            <p className="text-destructive mb-4">{error}</p>
                            <Button onClick={fetchOrders} variant="outline">Try Again</Button>
                        </div>
                    ) : orders.length === 0 ? (
                        <div className="text-center py-24 bg-card rounded-2xl border border-border shadow-sm">
                            <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-secondary text-muted-foreground mb-6">
                                <Package className="h-10 w-10" />
                            </div>
                            <h2 className="text-2xl font-serif font-semibold text-foreground mb-3">No orders yet</h2>
                            <p className="text-muted-foreground mb-8 max-w-xs mx-auto">
                                You haven't placed any orders with us yet. Start exploring our collection!
                            </p>
                            <Link href="/shop">
                                <Button size="lg" className="rounded-full px-8">
                                    Start Shopping
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {orders.map((order) => (
                                <div key={order.id} className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden group">
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
                                                <div className="hidden sm:block">
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
                                                    <p className="font-bold text-sm text-foreground">${(item.product_price * item.quantity).toFixed(2)}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    {order.id && (
                                        <div className="bg-muted/30 px-8 py-3 flex justify-end group-hover:bg-muted/50 transition-colors">
                                            <Link href={`/orders/${order.id}`} className="text-xs font-bold text-primary flex items-center gap-1 uppercase tracking-widest">
                                                Order Details <ChevronRight className="h-3 w-3" />
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </ProtectedRoute>
    )
}
