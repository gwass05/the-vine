"use client"

import React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, CheckCircle2 } from "lucide-react"

export function Newsletter() {
    const [email, setEmail] = useState("")
    const [isSubmitted, setIsSubmitted] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (email) {
            setIsSubmitted(true)
            setEmail("")
        }
    }

    return (
        <section className="py-20 lg:py-28">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="relative overflow-hidden rounded-3xl bg-foreground px-6 py-16 text-center lg:px-16 lg:py-24">
                    {/* Background Decorations */}
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
                        <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
                    </div>

                    {/* Content */}
                    <div className="relative z-10">
                        {/* Icon */}
                        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
                            <Mail className="h-8 w-8 text-primary" />
                        </div>

                        <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-primary">
                            Stay Connected
                        </p>

                        <h2 className="font-serif text-3xl font-semibold text-background sm:text-4xl lg:text-5xl text-balance">
                            Join Our Faith Community
                        </h2>

                        <p className="mx-auto mt-4 max-w-xl text-background/80 lg:text-lg">
                            Subscribe for exclusive offers, new arrivals, and inspiring content delivered straight to your inbox.
                        </p>

                        {/* Form */}
                        {isSubmitted ? (
                            <div className="mx-auto mt-8 flex max-w-md items-center justify-center gap-3 rounded-full bg-primary/20 px-6 py-4">
                                <CheckCircle2 className="h-6 w-6 text-primary" />
                                <span className="font-medium text-background">
                                    Thank you for subscribing! God bless you.
                                </span>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
                                <Input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="flex-1 rounded-full border-background/20 bg-background/10 px-6 py-6 text-background placeholder:text-background/60 focus:border-primary focus:ring-primary"
                                />
                                <Button
                                    type="submit"
                                    size="lg"
                                    className="rounded-full bg-primary px-8 text-primary-foreground hover:bg-primary/90"
                                >
                                    Subscribe
                                </Button>
                            </form>
                        )}

                        <p className="mt-4 text-xs text-background/60">
                            We respect your privacy. Unsubscribe at any time.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

