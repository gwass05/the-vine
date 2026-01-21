"use client"

import { Button } from "@/components/ui/button"
import { ShoppingBag, Minus, Plus } from "lucide-react"
import { useCartStore } from "@/lib/store"
import type { Product } from "@/lib/types"
import { useState } from "react"

interface ProductAddToCartProps {
    product: Product
}

export function ProductAddToCart({ product }: ProductAddToCartProps) {
    const addItem = useCartStore(state => state.addItem)
    const [added, setAdded] = useState(false)
    const [quantity, setQuantity] = useState(1)

    const handleAddToCart = () => {
        // Add the item multiple times based on quantity
        for (let i = 0; i < quantity; i++) {
            addItem(product)
        }
        setAdded(true)
        setTimeout(() => {
            setAdded(false)
            setQuantity(1) // Reset quantity after adding
        }, 2000)
    }

    const increaseQuantity = () => {
        setQuantity(prev => Math.min(prev + 1, 99)) // Max 99
    }

    const decreaseQuantity = () => {
        setQuantity(prev => Math.max(prev - 1, 1)) // Min 1
    }

    return (
        <div className="flex flex-col gap-4">
            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-muted-foreground">Quantity:</span>
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-10 w-10 rounded-full"
                        onClick={decreaseQuantity}
                        disabled={quantity <= 1}
                    >
                        <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center text-lg font-medium">{quantity}</span>
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-10 w-10 rounded-full"
                        onClick={increaseQuantity}
                        disabled={quantity >= 99}
                    >
                        <Plus className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {/* Add to Cart Button */}
            <Button
                size="lg"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 text-lg h-14 rounded-full"
                onClick={handleAddToCart}
            >
                <ShoppingBag className="mr-2 h-5 w-5" />
                {added ? "Added to Cart!" : "Add to Cart"}
            </Button>
        </div>
    )
}
