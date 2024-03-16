import Stripe from "stripe";
import logCollector from "./logCollector.mjs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function formOrderLink(order, email) {
  const link = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: `Order no. ${order.orderId}`,
          },
          unit_amount: order.cost * 100,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: process.env.URI,
    cancel_url: process.env.URI,
  });
  logCollector.log(link.url);
  // const info = await this.transporter.sendMail({
  //   to: to,
  //   subject: subject,
  //   text: link,
  // });
  return link.url;
}
