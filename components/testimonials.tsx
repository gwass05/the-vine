"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

const testimonials = [
    {
        id: 1,
        quote: "The cross necklace I ordered is absolutely stunning. You can feel the love and faith that went into creating it. It's become my daily reminder of God's grace.",
        author: "Sarah M.",
        location: "Cape Town",
        rating: 5,
        product: "Cross Pendant Necklace",
    },
    {
        id: 2,
        quote: "I ordered a gift hamper for my mother's birthday and she was moved to tears. The presentation was beautiful and every item felt personally chosen with care.",
        author: "David K.",
        location: "Johannesburg",
        rating: 5,
        product: "Blessing Gift Hamper",
    },
    {
        id: 3,
        quote: "CYC Kingdom catered our church fellowship lunch and the food was incredible! Everyone asked where we got such delicious meals. Will definitely order again.",
        author: "Pastor Ruth N.",
        location: "Durban",
        rating: 5,
        product: "Sunday Feast Platter",
    },
    {
        id: 4,
        quote: "The scripture plaque on my desk brings me peace during stressful workdays. It's beautifully crafted and the perfect size. Highly recommend!",
        author: "Michael T.",
        location: "Pretoria",
        rating: 5,
        product: "Scripture Desk Plaque",
    },
]

export function Testimonials() {
    const [currentIndex, setCurrentIndex] = useState(0)

    const nextTestimonial = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }

    const prevTestimonial = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    }

    const currentTestimonial = testimonials[currentIndex]

    return (
        <section id="about" className="py-20 lg:py-28 bg-secondary/50">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-12 lg:mb-16">
                    <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-primary">
                        Testimonials
                    </p>
                    <h2 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl lg:text-5xl text-balance">
                        Words from Our Community
                    </h2>
                </div>

                {/* Testimonial Card */}
                <div className="mx-auto max-w-4xl">
                    <div className="relative rounded-3xl bg-card border border-border p-8 lg:p-12 text-center">
                        {/* Decorative Quote */}
                        <div className="absolute top-6 left-8 text-6xl font-serif text-primary/20 leading-none">
                            "
                        </div>

                        {/* Rating */}
                        <div className="mb-6 flex justify-center gap-1">
                            {Array.from({ length: currentTestimonial.rating }).map((_, i) => (
                                <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                            ))}
                        </div>

                        {/* Quote */}
                        <blockquote className="relative z-10 font-serif text-xl leading-relaxed text-foreground lg:text-2xl lg:leading-relaxed">
                            {currentTestimonial.quote}
                        </blockquote>

                        {/* Author */}
                        <div className="mt-8">
                            <p className="font-semibold text-foreground">{currentTestimonial.author}</p>
                            <p className="text-sm text-muted-foreground">{currentTestimonial.location}</p>
                            <p className="mt-1 text-xs font-medium text-primary">Purchased: {currentTestimonial.product}</p>
                        </div>

                        {/* Navigation */}
                        <div className="mt-8 flex items-center justify-center gap-4">
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={prevTestimonial}
                                className="rounded-full border-border bg-transparent"
                            >
                                <ChevronLeft className="h-5 w-5" />
                                <span className="sr-only">Previous testimonial</span>
                            </Button>

                            {/* Dots */}
                            <div className="flex gap-2">
                                {testimonials.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentIndex(index)}
                                        className={`h-2 w-2 rounded-full transition-colors ${index === currentIndex ? "bg-primary" : "bg-border"
                                            }`}
                                        aria-label={`Go to testimonial ${index + 1}`}
                                    />
                                ))}
                            </div>

                            <Button
                                variant="outline"
                                size="icon"
                                onClick={nextTestimonial}
                                className="rounded-full border-border bg-transparent"
                            >
                                <ChevronRight className="h-5 w-5" />
                                <span className="sr-only">Next testimonial</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

