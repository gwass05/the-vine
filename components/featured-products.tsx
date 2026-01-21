"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Heart, ShoppingBag } from "lucide-react"
import { products } from "@/lib/data"
import Link from "next/link"

export function FeaturedProducts() {
    const [hoveredProduct, setHoveredProduct] = useState<number | null>(null)

    // Only show the first 3 products for the featured section
    const featuredProducts = products.slice(0, 3)

    return (
        <section className="py-20 lg:py-28">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="flex flex-col items-center text-center mb-12 lg:mb-16">
                    <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-primary">
                        Curated Selection
                    </p>
                    <h2 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl lg:text-5xl text-balance">
                        Featured Products
                    </h2>
                    <p className="mt-4 max-w-2xl text-muted-foreground lg:text-lg">
                        Handpicked treasures that embody faith, elegance, and thoughtful craftsmanship.
                    </p>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {featuredProducts.map((product) => (
                        <article
                            key={product.id}
                            className="group relative"
                            onMouseEnter={() => setHoveredProduct(product.id)}
                            onMouseLeave={() => setHoveredProduct(null)}
                        >
                            {/* Image Container */}
                            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-muted">
                                {/* Placeholder Image */}
                                <div className="absolute inset-0 flex items-center justify-center bg-secondary">
                                    <div className="text-center">
                                        <div className="mx-auto mb-2 h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                                            <span className="text-2xl text-primary">✦</span>
                                        </div>
                                        <span className="text-xs text-muted-foreground">{product.category}</span>
                                    </div>
                                </div>

                                {/* Badge */}
                                {product.badge && (
                                    <span className="absolute top-4 left-4 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                                        {product.badge}
                                    </span>
                                )}

                                {/* Quick Actions */}
                                <div className={`absolute bottom-4 left-4 right-4 flex gap-2 transition-all duration-300 ${hoveredProduct === product.id ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                                    }`}>
                                    <Button className="flex-1 bg-card/95 backdrop-blur-sm text-foreground hover:bg-card border border-border">
                                        <ShoppingBag className="mr-2 h-4 w-4" />
                                        Add to Cart
                                    </Button>
                                    <Button size="icon" variant="outline" className="bg-card/95 backdrop-blur-sm border-border">
                                        <Heart className="h-4 w-4" />
                                        <span className="sr-only">Add to wishlist</span>
                                    </Button>
                                </div>

                                <Link href={`/product/${product.id}`} className="absolute inset-0 z-10">
                                    <span className="sr-only">View {product.name}</span>
                                </Link>
                            </div>

                            {/* Product Info */}
                            <div className="mt-4">
                                <p className="text-xs font-medium uppercase tracking-wider text-primary">
                                    {product.category}
                                </p>
                                <h3 className="mt-1 font-serif text-lg font-medium text-foreground group-hover:text-primary transition-colors">
                                    <Link href={`/product/${product.id}`}>
                                        {product.name}
                                    </Link>
                                </h3>
                                <p className="mt-1 text-base font-semibold text-foreground">
                                    ${product.price.toFixed(2)}
                                </p>
                            </div>
                        </article>
                    ))}
                </div>

                {/* View All Button */}
                <div className="mt-12 text-center">
                    <Button asChild variant="outline" size="lg" className="border-foreground/20 px-12 bg-transparent">
                        <Link href="/shop">
                            View All Products
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}
