"use client"

import { Button } from "@/components/ui/button"
import { ShoppingBag, Heart } from "lucide-react"
import { useCartStore } from "@/lib/store"
import type { Product } from "@/lib/types"
import { useState } from "react"

interface AddToCartButtonProps {
    product: Product
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
    const addItem = useCartStore(state => state.addItem)
    const [added, setAdded] = useState(false)

    const handleAddToCart = () => {
        addItem(product)
        setAdded(true)
        setTimeout(() => setAdded(false), 2000)
    }

    return (
        <Button
            className="flex-1 bg-card/95 backdrop-blur-sm text-foreground hover:bg-card border border-border"
            onClick={handleAddToCart}
        >
            <ShoppingBag className="mr-2 h-4 w-4" />
            {added ? "Added!" : "Add"}
        </Button>
    )
}
