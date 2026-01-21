import { notFound } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { products } from "@/lib/data"
import { ShoppingBag, Heart, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { ProductAddToCart } from "@/components/product-add-to-cart"
import { WishlistButton } from "@/components/wishlist-button"

export function generateStaticParams() {
    return products.map((product) => ({
        id: product.id.toString(),
    }))
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const product = products.find((p) => p.id.toString() === id)

    if (!product) {
        notFound()
    }

    return (
        <div className="min-h-screen bg-background pt-20 lg:pt-28">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
                <Link href="/shop" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Shop
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                    {/* Image Section */}
                    <div className="relative aspect-square rounded-3xl bg-secondary overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-9xl text-primary/10">✦</span>
                        </div>
                        {/* In a real app, use Image component here */}
                    </div>

                    {/* Details Section */}
                    <div className="flex flex-col justify-center">
                        <div className="mb-6">
                            <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary mb-4">
                                {product.category}
                            </span>
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold text-foreground mb-4">
                                {product.name}
                            </h1>
                            <p className="text-2xl font-medium text-foreground">
                                ${product.price.toFixed(2)}
                            </p>
                        </div>

                        <div className="prose prose-stone dark:prose-invert max-w-none mb-8">
                            <p className="text-muted-foreground text-lg leading-relaxed">
                                {product.description}
                            </p>
                        </div>

                        <ProductAddToCart product={product} />

                        <div className="mt-4">
                            <WishlistButton product={product} size="icon" className="w-full" />
                        </div>

                        <div className="border-t border-border pt-8 space-y-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                                Free delivery on orders over $150
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                                30-day return policy
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                                Secure payment processing
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
