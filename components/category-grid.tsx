import Link from "next/link"
import { categories } from "@/lib/data"

export function CategoryGrid() {
    return (
        <section id="categories" className="py-20 lg:py-28 bg-secondary/50">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-12 lg:mb-16">
                    <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-primary">
                        Shop by Category
                    </p>
                    <h2 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl lg:text-5xl text-balance">
                        Explore Our Collections
                    </h2>
                    <p className="mt-4 max-w-2xl mx-auto text-muted-foreground lg:text-lg">
                        From elegant jewellery to heartwarming gift hampers, find the perfect treasure for every occasion.
                    </p>
                </div>

                {/* Category Grid */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
                    {categories.map((category) => (
                        <Link
                            key={category.name}
                            href={category.href}
                            className={`group relative flex flex-col items-center justify-center rounded-2xl border border-border bg-card p-8 text-center transition-all duration-300 hover:border-primary/30 hover:shadow-lg ${category.featured ? "lg:col-span-1 lg:row-span-1" : ""
                                }`}
                        >
                            {/* Icon */}
                            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                                <category.icon className="h-7 w-7" />
                            </div>

                            {/* Content */}
                            <h3 className="font-serif text-xl font-semibold text-foreground">
                                {category.name}
                            </h3>
                            <p className="mt-2 text-sm text-muted-foreground">
                                {category.description}
                            </p>

                            {/* Hover Arrow */}
                            <span className="mt-4 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                                Shop Now →
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}
