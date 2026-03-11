import { NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-02-25.clover",
})

type CartItem = {
  name: string
  price: number
  quantity: number
  image: string
}

export async function POST(request: Request) {
  try {
    const { items } = (await request.json()) as { items: CartItem[] }

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "カートが空です" }, { status: 400 })
    }

    const origin = request.headers.get("origin") || "https://eat-yui.com"

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: items.map((item) => ({
        price_data: {
          currency: "jpy",
          product_data: {
            name: item.name,
          },
          unit_amount: item.price,
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: `${origin}/shop/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/shop`,
      shipping_address_collection: {
        allowed_countries: ["JP"],
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error("Stripe checkout error:", error)
    return NextResponse.json(
      { error: "決済セッションの作成に失敗しました" },
      { status: 500 }
    )
  }
}
