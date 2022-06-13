import nc from "next-connect";
import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_STRIPE_SECRET_KEY);

// products getting function here
const handler = nc();

handler.post(async (req, res) => {
  const paymentInfo = req.body;
  const amount = paymentInfo.payable_amount * 100;
  const paymentIntent = await stripe.paymentIntents.create({
    currency: "bdt",
    amount: amount,
    payment_method_types: ["card"],
  });

  res.send({ success: true, clientSecret: paymentIntent.client_secret });
});

// function export here
export default handler;
