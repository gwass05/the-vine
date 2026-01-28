"use server";

import Stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  throw new Error("STRIPE_SECRET_KEY is not set in environment variables.");
}

const stripe = new Stripe(stripeSecretKey, {
  apiVersion: "2025-02-24.acacia",
});

export async function createStripeCheckoutSession(orderId: string, amount: number) {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/cancel`,
    metadata: {
      orderId,
      amount: amount.toString(),
    },
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: `Order ${orderId}`,
          },
          unit_amount: Math.round(amount * 100),
        },
        quantity: 1,
      },
    ],
  });

  return {
    url: session.url,
  };
}

