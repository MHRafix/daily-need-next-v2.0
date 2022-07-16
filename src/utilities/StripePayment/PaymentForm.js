import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import Router from "next/router";
import { useEffect, useState } from "react";
import { BiErrorCircle } from "react-icons/bi";
import { MdCloudDone } from "react-icons/md";
import { useDispatch } from "react-redux";
import { reduceCookie } from "../../redux/cart_products/action";
import AlertToast from "../alertToast/AlertToast";
import { FormButton, FormTextField } from "../Form/FormField";

export default function PaymentForm({ payable_amount, order_id }) {
  const dispatch = useDispatch();
  const empty_data = [];

  const [processing, setprocessing] = useState(false);
  const [clientSecret, setClientSecret] = useState("");

  // card details here
  const [customername, setCustomername] = useState("");
  const [customeremail, setCustomeremail] = useState("");
  const [customerphone, setCustomerphone] = useState("");

  // alert toast message state here
  const [toastOn, setToastOn] = useState(false);
  const [toastType, setToastType] = useState("");
  const [toastText, setToastText] = useState("");

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
        setClientSecret(data?.clientSecret);
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

    setprocessing(true);
    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setToastOn(true);
      setprocessing(false);
      setToastText(error.message);
      setToastType("error_toast");
    } else {
      setToastText("");
    }

    // Paymey intent
    const { paymentIntent, error: intentError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
        },
      });

    if (intentError) {
      setToastOn(true);
      setprocessing(false);
      setToastType("error_toast");
      setToastText(intentError.message);
    } else {
      setToastOn(true);
      setprocessing(false);
      setToastType("success_toast");
      setToastText("Your payment successfully proccesed!");

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

  // toast controll configuration here
  /****** */
  // handle close toast here
  const handleRemoveToast = () => {
    setToastOn(false);
  };

  // auto close toast after ther 5000ms delay
  if (toastOn) {
    setTimeout(() => {
      setToastOn(false);
    }, 5000);
  }

  // toast setting configuration here
  const toast_config = {
    toastStyle: toastType,
    alertText: toastText,
    toastIcon:
      toastType === "error_toast" ? <BiErrorCircle /> : <MdCloudDone />,

    handleRemoveToast: handleRemoveToast,
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* message toast alert */}
      {toastOn && <AlertToast toast_config={toast_config} />}

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

      <div style={{ marginTop: "15px" }}>
        <FormButton
          type="submit"
          processing={processing}
          btn_name={`Pay Now ৳ ${payable_amount}`}
          disabled={processing || !stripe}
        />
      </div>
    </form>
  );
}
