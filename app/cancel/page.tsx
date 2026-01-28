import Link from "next/link"

export default function CancelPage() {
  return (
    <div className="min-h-screen bg-background pt-20 lg:pt-28 flex items-center justify-center">
      <div className="max-w-md w-full px-6 py-10 bg-card rounded-2xl border border-border shadow-sm text-center">
        <h1 className="text-3xl font-serif font-bold text-foreground mb-3">Payment canceled</h1>
        <p className="text-muted-foreground mb-8">
          No worries — your payment wasn’t completed. You can retry checkout whenever you’re ready.
        </p>
        <div className="space-y-3">
          <Link href="/checkout" className="inline-block w-full">
            <span className="inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-3 text-primary-foreground font-semibold">
              Retry checkout
            </span>
          </Link>
          <Link className="block text-sm text-primary hover:underline" href="/cart">
            Back to cart
          </Link>
        </div>
      </div>
    </div>
  )
}

