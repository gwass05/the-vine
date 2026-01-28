"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, ShoppingBag, Search, Heart } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { cn } from "@/lib/utils"
import { useTotalItems } from "@/lib/store"
import { useAuth } from "@/contexts/auth-context"

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/shop", label: "Shop" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
]

export function Header() {
    const { user, signOut } = useAuth()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isVisible, setIsVisible] = useState(true)
    const [lastScrollY, setLastScrollY] = useState(0)
    const [activeSection, setActiveSection] = useState("")
    const [mounted, setMounted] = useState(false)
    const totalItems = useTotalItems()

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY

            // Visibility Logic
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsVisible(false)
            } else {
                setIsVisible(true)
            }
            setLastScrollY(currentScrollY)

            // Active Section Logic
            // Check scroll position against section offsets
            const sections = navLinks.map(link => {
                const id = link.href.substring(1)
                const element = id === "" ? document.body : document.getElementById(id)
                if (element) {
                    const rect = element.getBoundingClientRect()
                    // Check if top of section is near the viewport top or within viewport
                    if (rect.top <= 150 && rect.bottom >= 150) {
                        return link.href
                    }
                }
                return null
            })

            const currentActive = sections.find(section => section !== null)
            if (currentActive) {
                setActiveSection(currentActive)
            }
        }

        window.addEventListener("scroll", handleScroll, { passive: true })
        return () => window.removeEventListener("scroll", handleScroll)
    }, [lastScrollY])

    useEffect(() => {
        setMounted(true)
    }, [])

    return (
        <header className={cn(
            "fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border transition-transform duration-300",
            isVisible ? "translate-y-0" : "-translate-y-full"
        )}>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-20 items-center justify-between lg:h-28">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <Image
                            src="/logo.jpg"
                            alt="The Vine"
                            width={240}
                            height={120}
                            className="h-16 w-auto object-contain dark:invert lg:h-24 mix-blend-multiply dark:mix-blend-normal"
                            priority
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex lg:items-center lg:gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                className={cn(
                                    "text-sm font-medium transition-colors hover:text-foreground",
                                    activeSection === link.href ? "text-primary font-bold" : "text-muted-foreground"
                                )}
                            >
                                {link.label}
                            </Link>
                        ))}
                        {mounted && user && (
                            <Link
                                href="/orders"
                                className={cn(
                                    "text-sm font-medium transition-colors hover:text-foreground",
                                    activeSection === "/orders" ? "text-primary font-bold" : "text-muted-foreground"
                                )}
                            >
                                Orders
                            </Link>
                        )}
                    </nav>

                    {/* Desktop Actions */}
                    <div className="hidden lg:flex lg:items-center lg:gap-4">
                        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                            <Search className="h-5 w-5" />
                            <span className="sr-only">Search</span>
                        </Button>
                        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                            <Heart className="h-5 w-5" />
                            <span className="sr-only">Wishlist</span>
                        </Button>
                        <Link href="/cart">
                            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground relative">
                                <ShoppingBag className="h-5 w-5" />
                                {mounted && totalItems > 0 && (
                                    <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-medium">
                                        {totalItems}
                                    </span>
                                )}
                                <span className="sr-only">Cart</span>
                            </Button>
                        </Link>
                        <ModeToggle />

                        {mounted && (
                            user ? (
                                <div className="flex items-center gap-4 ml-2 pl-4 border-l border-border">
                                    <span className="text-sm text-muted-foreground truncate max-w-[150px]">
                                        {user.email}
                                    </span>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="rounded-full"
                                        onClick={() => signOut()}
                                    >
                                        Logout
                                    </Button>
                                </div>
                            ) : (
                                <Link href="/login">
                                    <Button variant="default" size="sm" className="rounded-full px-6">
                                        Login
                                    </Button>
                                </Link>
                            )
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="lg:hidden text-muted-foreground"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        <span className="sr-only">Toggle menu</span>
                    </Button>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="lg:hidden border-t border-border py-4 animate-in slide-in-from-top duration-300">
                        <nav className="flex flex-col gap-4 px-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    className={cn(
                                        "text-base font-medium py-2 px-4 rounded-lg transition-colors hover:bg-accent",
                                        activeSection === link.href ? "text-primary bg-primary/5" : "text-muted-foreground"
                                    )}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            {mounted && user && (
                                <Link
                                    href="/orders"
                                    className={cn(
                                        "text-base font-medium py-2 px-4 rounded-lg transition-colors hover:bg-accent",
                                        activeSection === "/orders" ? "text-primary bg-primary/5" : "text-muted-foreground"
                                    )}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Orders
                                </Link>
                            )}
                        </nav>
                        <div className="mt-4 flex flex-col gap-4 pt-6 border-t border-border px-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground h-11 w-11 border border-border">
                                        <Search className="h-5 w-5" />
                                        <span className="sr-only">Search</span>
                                    </Button>
                                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground h-11 w-11 border border-border">
                                        <Heart className="h-5 w-5" />
                                        <span className="sr-only">Wishlist</span>
                                    </Button>
                                    <Link href="/cart" onClick={() => setIsMenuOpen(false)}>
                                        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground h-11 w-11 border border-border relative">
                                            <ShoppingBag className="h-5 w-5" />
                                            {mounted && totalItems > 0 && (
                                                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-medium">
                                                    {totalItems}
                                                </span>
                                            )}
                                            <span className="sr-only">Cart</span>
                                        </Button>
                                    </Link>
                                </div>
                                <ModeToggle />
                            </div>

                            {mounted && (
                                user ? (
                                    <div className="flex flex-col gap-3 pt-4 border-t border-border">
                                        <p className="text-sm text-muted-foreground text-center">
                                            Logged in as <span className="font-medium text-foreground">{user.email}</span>
                                        </p>
                                        <Button
                                            variant="outline"
                                            className="w-full rounded-full h-11"
                                            onClick={() => {
                                                signOut()
                                                setIsMenuOpen(false)
                                            }}
                                        >
                                            Logout
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="pt-4 border-t border-border">
                                        <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                                            <Button variant="default" className="w-full rounded-full h-11">
                                                Login
                                            </Button>
                                        </Link>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                )}
            </div>
        </header>
    )
}
