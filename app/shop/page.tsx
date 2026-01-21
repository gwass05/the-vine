import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { products, categories } from "@/lib/data"
import { ShoppingBag, Heart } from "lucide-react"
import { cn } from "@/lib/utils"
import { AddToCartButton } from "@/components/add-to-cart-button"
import { WishlistButton } from "@/components/wishlist-button"

export default async function ShopPage({
    searchParams,
}: {
    searchParams: Promise<{ category?: string }>
}) {
    const { category } = await searchParams
    const selectedCategory = category
    const filteredProducts = selectedCategory
        ? products.filter(p => p.category === selectedCategory)
        : products

    return (
        <div className="min-h-screen bg-background pt-20 lg:pt-28">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar Filters */}
                    <aside className="w-full md:w-64 flex-shrink-0">
                        <div className="sticky top-28 space-y-8">
                            <div>
                                <h3 className="text-lg font-serif font-semibold mb-4">Categories</h3>
                                <ul className="space-y-2">
                                    <li>
                                        <Link
                                            href="/shop"
                                            className={cn(
                                                "block text-sm transition-colors",
                                                !selectedCategory ? "text-primary font-medium" : "text-muted-foreground hover:text-foreground"
                                            )}
                                        >
                                            All Products
                                        </Link>
                                    </li>
                                    {categories.map(category => (
                                        <li key={category.name}>
                                            <Link
                                                href={`/shop?category=${encodeURIComponent(category.name)}`}
                                                className={cn(
                                                    "block text-sm transition-colors",
                                                    selectedCategory === category.name ? "text-primary font-medium" : "text-muted-foreground hover:text-foreground"
                                                )}
                                            >
                                                {category.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </aside>

                    {/* Product Grid */}
                    <div className="flex-1">
                        <div className="mb-8">
                            <h1 className="text-3xl font-serif font-semibold text-foreground">
                                {selectedCategory || "All Products"}
                            </h1>
                            <p className="text-muted-foreground mt-2">
                                Showing {filteredProducts.length} results
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredProducts.map((product) => (
                                <article key={product.id} className="group relative">
                                    {/* Image Container */}
                                    <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-muted">
                                        <div className="absolute inset-0 flex items-center justify-center bg-secondary">
                                            {/* Placeholder for when real images aren't loaded, actually displaying specific logic if image not found, but we assume images exist or fallback */}
                                            {/* We will use a fallback visual if image load fails or just the text if using simple placeholders */}
                                            <div className="text-center">
                                                <span className="text-4xl text-primary/20">✦</span>
                                            </div>
                                        </div>

                                        {/* Badge */}
                                        {product.badge && (
                                            <span className="absolute top-4 left-4 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                                                {product.badge}
                                            </span>
                                        )}

                                        {/* Quick Actions */}
                                        <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                                            <AddToCartButton product={product} />
                                            <WishlistButton
                                                product={product}
                                                size="icon"
                                                className="bg-card/95 backdrop-blur-sm border-border h-auto w-auto p-2"
                                            />
                                        </div>

                                        {/* Main Link */}
                                        <Link href={`/product/${product.id}`} className="absolute inset-0">
                                            <span className="sr-only">View {product.name}</span>
                                        </Link>
                                    </div>

                                    {/* Info */}
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
                    </div>
                </div>
            </div>
        </div>
    )
}
