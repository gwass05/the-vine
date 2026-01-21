import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
    return (
        <section id="hero" className="relative pt-20 lg:pt-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center py-16 text-center lg:py-28">
                    {/* Tagline */}
                    <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-primary">
                        Faith-Inspired Creations
                    </p>

                    {/* Main Headline */}
                    <h1 className="max-w-4xl font-serif text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-7xl text-balance">
                        Elegant Treasures for{" "}
                        <span className="text-primary">Heart & Home</span>
                    </h1>

                    {/* Subheadline */}
                    <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground lg:text-xl text-pretty">
                        Discover curated Christian jewellery, artisan home décor, delicious catering,
                        and thoughtfully crafted gift hampers that celebrate faith and fellowship.
                    </p>

                    <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:gap-6">
                        <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-8">
                            <Link href="/shop">
                                Explore Collections
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="border-foreground/20 px-8 bg-transparent">
                            <Link href="/about">
                                Our Story
                            </Link>
                        </Button>
                    </div>

                    {/* Trust Indicators */}
                    <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <span className="text-primary">✦</span>
                            <span>Handcrafted with Love</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-primary">✦</span>
                            <span>Faith-Centered Designs</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-primary">✦</span>
                            <span>Blessed to Bless Others</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Decorative Background */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-3xl" />
            </div>
        </section>
    )
}
