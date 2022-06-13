import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import Router from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { reduceCookie } from "../../redux/cart_products/action";
import { ErrorAlert, SuccessMessage } from "../AlertMessage";
import { FormTextField } from "../Form/FormField";

export default function PaymentForm({ payable_amount, order_id }) {
  const dispatch = useDispatch();
  const empty_data = [];

  const [error, setError] = useState();
  const [proccesing, setProccesing] = useState(false);
  const [success, setSuccess] = useState();
  const [clientSecret, setClientSecret] = useState("");

  // card details here
  const [customername, setCustomername] = useState("");
  const [customeremail, setCustomeremail] = useState("");
  const [customerphone, setCustomerphone] = useState("");

  useEffect(() => {
    fetch(
      // "http://localhost:3000/api/stripe_payment/payment_intent",
      "https://daily-need.vercel.app/api/stripe_payment/payment_intent",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },

        body: JSON.stringify({ payable_amount }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
      });
  }, [payable_amount]);

  // use stripe and elements
  const stripe = useStripe();
  const elements = useElements();

  // Handle crdit card form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Conditionaly payment
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    setProccesing(true);
    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setProccesing(false);
      setError(error.message);
      setSuccess("");
    } else {
      setError("");
    }

    // Paymey intent
    const { paymentIntent, error: intentError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
        },
      });

    if (intentError) {
      setSuccess("");
      setError(intentError.message);
    } else {
      setError("");
      setSuccess("Your payment successfully proccesed!");
      setProccesing(false);

      // Save to database
      const payment_info = {
        payment_method: "stripe card",
        payment_status: "paid",
        customer_name: customername,
        customer_email: customeremail,
        customer_phone: customerphone,
        payment_amount: paymentIntent.amount,
        card_name: paymentMethod.card.brand,
        created: paymentIntent.created,
        last4: paymentMethod.card.last4,
        transaction: paymentIntent.client_secret.slice("_secret")[0],
        order_id: order_id,
      };

      // const url = `http://localhost:3000/api/manage_orders/update_order`;
      const url = `https://daily-need.vercel.app/api//manage_orders/update_order`;
      fetch(url, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(payment_info),
      })
        .then((res) => res.json())
        .then((data) => {
          dispatch(reduceCookie(empty_data));
        });

      const redirect = () => {
        Router.push("/my_account/my_profile/dashboard");
      };

      setTimeout(redirect, 3000);
    }
  };

  const cardElementOpts = {
    style: {
      base: {
        iconColor: "#ff8750",
        color: "#31325F",
        lineHeight: "25px",
        fontWeight: 500,
        fontFamily: "Poppins",
        padding: "10px",
        fontSize: "16px",

        "::placeholder": {
          color: "#ff8750",
        },
      },
      invalid: {
        color: "#9e2146",
      },
    },
    // hidePostalCode: true,
  };

  return (
    <form onSubmit={handleSubmit}>
      {success && <SuccessMessage message={success} />}
      {error && <ErrorAlert message={error} />}

      <FormTextField
        form_label="your name"
        type="text"
        required={true}
        setState={setCustomername}
        disabled={false}
      />

      <FormTextField
        form_label="your email"
        type="email"
        required={true}
        setState={setCustomeremail}
        disabled={false}
      />

      <FormTextField
        form_label="your phone"
        type="text"
        required={true}
        setState={setCustomerphone}
        disabled={false}
      />

      <label id="input_label" htmlFor="field_label">
        card details
        <span id="required_sign">*</span>
      </label>
      <CardElement id="field_input" options={cardElementOpts} />

      {proccesing ? (
        <div style={{ marginTop: "15px" }}>
          <button className="location_pushBtn">Lodaing...</button>
        </div>
      ) : (
        <div style={{ marginTop: "15px" }}>
          <button
            className="location_pushBtn"
            type="submit"
            disabled={!stripe || success}
          >
            Pay Now ৳ {payable_amount}
          </button>
        </div>
      )}
    </form>
  );
}
