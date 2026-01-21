import Link from "next/link"
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react"

const footerLinks = {
    shop: [
        { label: "Christian Jewellery", href: "#" },
        { label: "Home Décor", href: "#" },
        { label: "Office Items", href: "#" },
        { label: "Catering", href: "#" },
        { label: "Gift Hampers", href: "#" },
    ],
    company: [
        { label: "About Us", href: "#" },
        { label: "Our Story", href: "#" },
        { label: "Contact", href: "#" },
        { label: "FAQs", href: "#" },
    ],
    support: [
        { label: "Shipping Info", href: "#" },
        { label: "Returns", href: "#" },
        { label: "Privacy Policy", href: "#" },
        { label: "Terms of Service", href: "#" },
    ],
}

const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
]

export function Footer() {
    return (
        <footer id="contact" className="border-t border-border bg-secondary/30">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
                    {/* Brand Column */}
                    <div className="lg:col-span-1">
                        <Link href="/" className="inline-block">
                            <span className="font-serif text-2xl font-semibold text-foreground">
                                CYC Kingdom
                            </span>
                        </Link>
                        <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
                            Faith-inspired creations crafted with love. Bringing blessings to your heart and home since 2020.
                        </p>

                        {/* Contact Info */}
                        <div className="mt-6 space-y-3">
                            <a href="mailto:hello@cyckingdom.com" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                                <Mail className="h-4 w-4 text-primary" />
                                hello@cyckingdom.com
                            </a>
                            <a href="tel:+27123456789" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                                <Phone className="h-4 w-4 text-primary" />
                                +27 12 345 6789
                            </a>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <MapPin className="h-4 w-4 text-primary" />
                                South Africa
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="mt-6 flex gap-4">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                                    aria-label={social.label}
                                >
                                    <social.icon className="h-5 w-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-3">
                        <div>
                            <h3 className="font-serif text-sm font-semibold uppercase tracking-wider text-foreground">
                                Shop
                            </h3>
                            <ul className="mt-4 space-y-3">
                                {footerLinks.shop.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-serif text-sm font-semibold uppercase tracking-wider text-foreground">
                                Company
                            </h3>
                            <ul className="mt-4 space-y-3">
                                {footerLinks.company.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-serif text-sm font-semibold uppercase tracking-wider text-foreground">
                                Support
                            </h3>
                            <ul className="mt-4 space-y-3">
                                {footerLinks.support.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 border-t border-border pt-8">
                    <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                        <p className="text-sm text-muted-foreground">
                            © {new Date().getFullYear()} CYC Kingdom Code Studios. All rights reserved.
                        </p>
                        <p className="text-sm text-muted-foreground">
                            Crafted with <span className="text-primary">♥</span> and faith
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}
