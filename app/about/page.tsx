export default function AboutPage() {
    return (
        <div className="min-h-screen bg-background pt-20 lg:pt-28">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 text-center">
                <span className="text-primary font-medium tracking-wider uppercase mb-4 block">Our Story</span>
                <h1 className="text-4xl lg:text-5xl font-serif font-semibold text-foreground mb-8">
                    Faith, Fellowship & Service
                </h1>

                <div className="prose prose-stone dark:prose-invert mx-auto text-lg leading-relaxed text-muted-foreground">
                    <p className="mb-6">
                        Welcome to CYC Kingdom Code Studios. We are more than just a store; we are a ministry dedicated to spreading the joy and love of Christ through our creations.
                    </p>
                    <p className="mb-6">
                        Founded in 2020, our mission has been to serve the Kingdom of God by providing high-quality, faith-inspired products that bless your home and heart. Whether it's a piece of jewellery that serves as a daily reminder of God's love, or a catered meal that brings families together, everything we do is rooted in faith.
                    </p>
                    <p>
                        We believe in excellence, integrity, and the power of community. Thank you for supporting our small business and being a part of our journey.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 text-left">
                    <div className="p-6 rounded-2xl bg-secondary/50">
                        <h3 className="font-serif text-xl font-semibold mb-2">Our Mission</h3>
                        <p className="text-sm text-muted-foreground">To glorify God through creativity and service, impacting lives one product at a time.</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-secondary/50">
                        <h3 className="font-serif text-xl font-semibold mb-2">Our Values</h3>
                        <p className="text-sm text-muted-foreground">Faith, Excellence, Integrity, Community, and Love.</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-secondary/50">
                        <h3 className="font-serif text-xl font-semibold mb-2">Our Promise</h3>
                        <p className="text-sm text-muted-foreground">To deliver quality products with a heart of service and a spirit of grace.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
