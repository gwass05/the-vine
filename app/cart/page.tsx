"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Trash2, ArrowRight, ShoppingBag } from "lucide-react"
import { useCartStore, useTotalPrice } from "@/lib/store"
import { useEffect, useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"

export default function CartPage() {
    const { user } = useAuth()
    const router = useRouter()
    const [mounted, setMounted] = useState(false)
    const { items, updateQuantity, removeItem } = useCartStore()
    const totalPrice = useTotalPrice()

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return (
            <div className="min-h-screen bg-background pt-20 lg:pt-28">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
                    <h1 className="text-3xl font-serif font-semibold text-foreground mb-8">
                        Your Shopping Cart
                    </h1>
                    <p className="text-muted-foreground">Loading...</p>
                </div>
            </div>
        )
    }

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-background pt-20 lg:pt-28">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
                    <h1 className="text-3xl font-serif font-semibold text-foreground mb-8">
                        Your Shopping Cart
                    </h1>
                    <div className="text-center py-16">
                        <ShoppingBag className="mx-auto h-16 w-16 text-muted-foreground/50 mb-4" />
                        <h2 className="text-xl font-medium text-foreground mb-2">Your cart is empty</h2>
                        <p className="text-muted-foreground mb-6">Add some items to get started!</p>
                        <Link href="/shop">
                            <Button size="lg">
                                Continue Shopping
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background pt-20 lg:pt-28">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
                <h1 className="text-3xl font-serif font-semibold text-foreground mb-8">
                    Your Shopping Cart
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-8 space-y-4">
                        {items.map((item) => (
                            <div key={item.product.id} className="flex gap-4 p-4 rounded-xl border border-border bg-card">
                                <div className="h-24 w-24 flex-shrink-0 rounded-lg bg-secondary flex items-center justify-center">
                                    <span className="text-2xl text-primary/20">✦</span>
                                </div>
                                <div className="flex flex-1 flex-col justify-between">
                                    <div className="flex justify-between gap-4">
                                        <div>
                                            <h3 className="font-medium">{item.product.name}</h3>
                                            <p className="text-sm text-muted-foreground">{item.product.category}</p>
                                        </div>
                                        <p className="font-medium">${item.product.price.toFixed(2)}</p>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className="h-8 w-8 rounded-full"
                                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                            >
                                                -
                                            </Button>
                                            <span className="w-8 text-center text-sm">{item.quantity}</span>
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className="h-8 w-8 rounded-full"
                                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                            >
                                                +
                                            </Button>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 text-destructive"
                                            onClick={() => removeItem(item.product.id)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Summary */}
                    <div className="lg:col-span-4">
                        <div className="rounded-xl border border-border bg-card p-6 sticky top-32">
                            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                            <div className="space-y-4">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Subtotal</span>
                                    <span>${totalPrice.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Shipping</span>
                                    <span>Calculated at checkout</span>
                                </div>
                                <div className="border-t border-border pt-4 flex justify-between font-semibold">
                                    <span>Total</span>
                                    <span>${totalPrice.toFixed(2)}</span>
                                </div>
                                <Button
                                    className="w-full"
                                    size="lg"
                                    onClick={() => {
                                        if (user) {
                                            router.push("/checkout")
                                        } else {
                                            router.push("/login?redirect=/checkout")
                                        }
                                    }}
                                >
                                    Proceed to Checkout
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                                <div className="text-center">
                                    <Link href="/shop" className="text-sm text-primary hover:underline">
                                        or Continue Shopping
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
