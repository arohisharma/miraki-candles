import { getProduct } from "@/data/products";
import { getStripe } from "@/lib/stripe";
import { validOrigin } from "@/lib/site";

type CartPayload = { items?: { slug: string; quantity: number }[] };

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as CartPayload;

  // Prices always come from the server-side catalogue, never from the client.
  const lineItems = [];
  for (const item of body.items ?? []) {
    const product = getProduct(item.slug);
    const quantity = Math.floor(item.quantity);
    if (!product || !(quantity >= 1 && quantity <= 20)) {
      return Response.json({ error: "Invalid cart" }, { status: 400 });
    }
    lineItems.push({
      quantity,
      price_data: {
        currency: "usd",
        unit_amount: Math.round(product.price * 100),
        product_data: {
          name: product.name,
          description: `${product.size} · ${product.tagline}`,
        },
      },
    });
  }
  if (lineItems.length === 0) {
    return Response.json({ error: "Cart is empty" }, { status: 400 });
  }

  const siteUrl = validOrigin(process.env.NEXT_PUBLIC_SITE_URL) ?? new URL(request.url).origin;

  try {
    const session = await getStripe().checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      shipping_address_collection: { allowed_countries: ["US"] },
      success_url: `${siteUrl}/checkout/success`,
      cancel_url: `${siteUrl}/cart`,
    });
    return Response.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    return Response.json({ error: "Could not start checkout" }, { status: 500 });
  }
}
