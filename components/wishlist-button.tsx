"use client"

import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import { useWishlistStore } from "@/lib/wishlist-store"
import type { Product } from "@/lib/types"
import { useState, useEffect } from "react"

interface WishlistButtonProps {
    product: Product
    size?: "default" | "lg" | "sm" | "icon"
    variant?: "default" | "outline" | "ghost"
    className?: string
}

export function WishlistButton({
    product,
    size = "lg",
    variant = "outline",
    className = ""
}: WishlistButtonProps) {
    const { addItem, removeItem, isInWishlist } = useWishlistStore()
    const [mounted, setMounted] = useState(false)
    const [isLiked, setIsLiked] = useState(false)

    useEffect(() => {
        setMounted(true)
        setIsLiked(isInWishlist(product.id))
    }, [product.id, isInWishlist])

    const handleToggleWishlist = () => {
        if (isLiked) {
            removeItem(product.id)
            setIsLiked(false)
        } else {
            addItem(product)
            setIsLiked(true)
        }
    }

    if (!mounted) {
        return (
            <Button
                size={size}
                variant={variant}
                className={className}
                disabled
            >
                <Heart className={size === "icon" ? "h-6 w-6" : "h-4 w-4"} />
                <span className="sr-only">Add to wishlist</span>
            </Button>
        )
    }

    return (
        <Button
            size={size}
            variant={variant}
            className={`${className} transition-colors`}
            onClick={handleToggleWishlist}
        >
            <Heart
                className={`${size === "icon" ? "h-6 w-6" : "h-4 w-4"} transition-all ${isLiked ? "fill-red-500 text-red-500" : ""}`}
            />
            <span className="sr-only">
                {isLiked ? "Remove from wishlist" : "Add to wishlist"}
            </span>
        </Button>
    )
}
