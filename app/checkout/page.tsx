"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ProtectedRoute } from "@/components/protected-route"
import { useAuth } from "@/contexts/auth-context"
import { useCartStore, useTotalPrice } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { createOrder } from "@/lib/supabase/orders"
import { CheckCircle2, Loader2, ArrowRight, ShoppingBag, CreditCard } from "lucide-react"
import Link from "next/link"

export default function CheckoutPage() {
    const { user } = useAuth()
    const router = useRouter()
    const { items, clearCart } = useCartStore()
    const totalPrice = useTotalPrice()
    const [isPlacingOrder, setIsPlacingOrder] = useState(false)
    const [orderSuccess, setOrderSuccess] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const handlePlaceOrder = async () => {
        if (!user) return

        setIsPlacingOrder(true)
        setError(null)

        try {
            const { order, error: orderError } = await createOrder(
                user.id,
                items,
                totalPrice
            )

            if (orderError) {
                setError(orderError)
            } else {
                setOrderSuccess(true)
                clearCart() // Clear local cart after successful order
            }
        } catch (err) {
            setError("An unexpected error occurred while placing your order.")
        } finally {
            setIsPlacingOrder(false)
        }
    }

    if (!mounted) return null

    if (orderSuccess) {
        return (
            <div className="min-h-screen bg-background pt-20 lg:pt-28 flex items-center justify-center">
                <div className="max-w-md w-full px-6 py-12 bg-card rounded-2xl border border-border shadow-sm text-center">
                    <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mb-6">
                        <CheckCircle2 className="h-10 w-10" />
                    </div>
                    <h1 className="text-3xl font-serif font-bold text-foreground mb-4">Order Placed!</h1>
                    <p className="text-muted-foreground mb-8">
                        Thank you for your purchase. Your order has been successfully saved to our system.
                    </p>
                    <div className="space-y-4">
                        <Link href="/orders">
                            <Button className="w-full rounded-full h-11" size="lg">
                                View Your Orders
                            </Button>
                        </Link>
                        <Link href="/shop" className="block text-sm text-primary hover:underline">
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-background pt-20 lg:pt-28 flex items-center justify-center">
                <div className="text-center">
                    <ShoppingBag className="mx-auto h-16 w-16 text-muted-foreground/30 mb-4" />
                    <h2 className="text-xl font-medium mb-2">Checkout is empty</h2>
                    <p className="text-muted-foreground mb-6">You don't have any items in your cart to checkout.</p>
                    <Link href="/shop">
                        <Button variant="default">Go to Shop</Button>
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-background pt-20 lg:pt-28">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
                    <h1 className="text-3xl font-serif font-bold text-foreground mb-12">Checkout</h1>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Order Form (Simplified as per requirements) */}
                        <div className="lg:col-span-12">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                {/* Details Card */}
                                <div className="space-y-8">
                                    <div className="bg-card rounded-2xl border border-border p-8 shadow-sm">
                                        <h2 className="text-xl font-serif font-semibold mb-6 flex items-center gap-2">
                                            <CreditCard className="h-5 w-5 text-primary" />
                                            Order Details
                                        </h2>
                                        <div className="space-y-4 text-sm">
                                            <div className="flex justify-between py-3 border-b border-border">
                                                <span className="text-muted-foreground">Order Status</span>
                                                <span className="font-medium text-primary uppercase tracking-wider text-xs bg-primary/10 px-2 py-1 rounded">Pending</span>
                                            </div>
                                            <div className="flex justify-between py-3 border-b border-border">
                                                <span className="text-muted-foreground">Payment Method</span>
                                                <span className="font-medium">Direct Checkout (Mock)</span>
                                            </div>
                                            <div className="flex justify-between py-3">
                                                <span className="text-muted-foreground">Customer Email</span>
                                                <span className="font-medium">{user?.email}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-6 bg-primary/5 rounded-2xl border border-primary/10">
                                        <p className="text-xs text-muted-foreground leading-relaxed">
                                            This is a demonstration store. Clicking "Complete Order" will save your order to the database. No real payment will be processed.
                                        </p>
                                    </div>
                                </div>

                                {/* Summary Card */}
                                <div className="bg-card rounded-2xl border border-border p-8 shadow-sm h-fit">
                                    <h2 className="text-xl font-serif font-semibold mb-6">Order Summary</h2>
                                    <div className="space-y-4 mb-8">
                                        {items.map((item) => (
                                            <div key={item.product.id} className="flex justify-between text-sm gap-4">
                                                <span className="text-muted-foreground">
                                                    {item.quantity}x {item.product.name}
                                                </span>
                                                <span className="font-medium">
                                                    ${(item.product.price * item.quantity).toFixed(2)}
                                                </span>
                                            </div>
                                        ))}
                                        <div className="border-t border-border pt-4 mt-4 space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-muted-foreground">Subtotal</span>
                                                <span>${totalPrice.toFixed(2)}</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-muted-foreground">Shipping</span>
                                                <span className="text-green-600 font-medium">Free</span>
                                            </div>
                                            <div className="flex justify-between font-bold text-lg pt-2 mt-2 border-t border-dashed border-border">
                                                <span>Total</span>
                                                <span className="text-primary">${totalPrice.toFixed(2)}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {error && (
                                        <div className="mb-6 p-4 bg-destructive/10 text-destructive text-sm rounded-xl border border-destructive/20">
                                            {error}
                                        </div>
                                    )}

                                    <Button
                                        className="w-full rounded-full h-12 text-base font-semibold shadow-lg shadow-primary/20"
                                        size="lg"
                                        disabled={isPlacingOrder}
                                        onClick={handlePlaceOrder}
                                    >
                                        {isPlacingOrder ? (
                                            <>
                                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                                Processing Order...
                                            </>
                                        ) : (
                                            <>
                                                Complete Order
                                                <ArrowRight className="ml-2 h-5 w-5" />
                                            </>
                                        )}
                                    </Button>

                                    <p className="text-center mt-6 text-xs text-muted-foreground">
                                        By placing your order, you agree to our terms and conditions.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    )
}
