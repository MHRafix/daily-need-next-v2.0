import axios from "axios";
import Cookie from "js-cookie";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { BiErrorCircle } from "react-icons/bi";
import { MdCloudDone, MdShoppingCart } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { reduceCookie } from "../../redux/cart_products/action";
import { ErrorMessage } from "../../utilities/AlertMessage";
import AlertToast from "../../utilities/alertToast/AlertToast";
import { FormButton, FormTextField } from "../../utilities/Form/FormField";
import StripePaymentForm from "../../utilities/StripePayment/StripePaymentForm";
import OrderOverview from "./OrderOverview/OrderOverview";

export default function BillingDetails() {
  const [processing, setProccessing] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const empty_data = [];
  const products_data = useSelector((state) => state.cart_product.cart_list);

  // calculate net total payable amount
  let total_amount = 0;
  if (products_data) {
    for (const products of products_data) {
      total_amount =
        products?.prices?.sale_price > 0
          ? total_amount + products?.prices?.sale_price * products?.quantity
          : total_amount + products?.prices?.regular_price * products?.quantity;
    }
  }

  const net_total = (total_amount + (total_amount / 100) * 3).toFixed(2);

  // loggedin user info and form data state
  const userInfo =
    Cookie.get("user_information") &&
    JSON.parse(Cookie.get("user_information"));

  const [paypalModal, setPaypalModal] = useState("");
  const [orderid, setOrderid] = useState("");

  // alert toast message state here
  const [toastOn, setToastOn] = useState(false);
  const [toastType, setToastType] = useState("");
  const [toastText, setToastText] = useState("");

  const [name, setName] = useState(userInfo?.user_name);
  const [email, setEmail] = useState(userInfo?.user_email);
  const [mobile, setMobile] = useState("");
  const [country, setCountry] = useState("");
  const [district, setDistrict] = useState("");
  const [street, setStreet] = useState("");
  const [payment, setPayment] = useState("cash-on");

  // make a user data object for ordering the products
  const order_data = {
    products_data,
    user_email: userInfo?.user_email,
    customer_info: {
      customer_name: name,
      customer_email: email,
      customer_mobile: mobile,
      customer_country: country,
      customer_district: district,
      customer_street: street,
    },

    order_overview: {
      order_status: "pendding",
      total_amount: net_total,
      total_qty: products_data?.length,
      order_date: {
        date: new Date().getDate(),
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
      },
    },

    payment_info: {
      payment_method: payment,
      payment_status: "due",
      customer_name: name,
      customer_email: email,
      customer_mobile: mobile,
      payment_amount: net_total,
      card_name: payment,
      created: "null",
      last4: "null",
      transaction: "null",
      order_id: "null",
    },
  };

  // form handle function here
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      setPaypalModal(false);
      setProccessing(true);

      const { data } = await axios.post(
        // "http://localhost:3000/api/checkout/place_order",
        "https://daily-need.vercel.app/api/checkout/place_order",
        order_data
      );

      if (data?.success) {
        setToastOn(true);
        setProccessing(false);
        setToastText(data.success);
        setToastType("success_toast");
        Cookie.remove("cart_product_ids");

        setTimeout(() => {
          if (payment === "cash-on") {
            router.push("/shop/grid_shop");
            dispatch(reduceCookie(empty_data));
          } else {
            setOrderid(data?.order_id);
            setPaypalModal(true);
          }
        }, 2000);
      } else {
        setToastOn(true);
        setProccessing(false);
        setToastText(data.error);
        setToastType("error_toast");
      }
    } catch (error) {
      setToastOn(true);
      setProccessing(false);
      setToastText(error.message);
      setToastType("error_toast");
    }
  };

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
    <>
      {products_data?.length ? (
        <div className="lg:flex justify-between">
          <div className="order_overview lg:w-2/5 lg:mr-10 ">
            <div className="title_of_details">
              <h1 className="text-medium font-semibold tracking-wider my-5 text-black2">
                Your Order
              </h1>
            </div>
            <OrderOverview
              carted_products={products_data}
              net_total={net_total}
            />
          </div>
          {!paypalModal ? (
            <div className="billing_details_form lg:w-3/5 lg:!mt-0 !mt-15">
              <div className="title_of_details">
                <h1 className="text-medium font-semibold tracking-wider my-5 text-black2">
                  Billing Details
                </h1>
              </div>
              <form onSubmit={handleFormSubmit}>
                {/* message toast alert */}
                {toastOn && <AlertToast toast_config={toast_config} />}

                <FormTextField
                  form_label="your name"
                  type="text"
                  defaultValue={userInfo?.user_name}
                  required={true}
                  disabled={false}
                  setState={setName}
                />
                <FormTextField
                  form_label="your email"
                  type="email"
                  defaultValue={userInfo?.user_email}
                  required={true}
                  disabled={false}
                  setState={setEmail}
                />
                <FormTextField
                  form_label="mobile number"
                  type="text"
                  required={true}
                  disabled={false}
                  setState={setMobile}
                />
                <FormTextField
                  form_label="your country"
                  type="text"
                  required={true}
                  disabled={false}
                  setState={setCountry}
                />
                <FormTextField
                  form_label="your district"
                  type="text"
                  required={true}
                  disabled={false}
                  setState={setDistrict}
                />
                <FormTextField
                  form_label="street address"
                  type="text"
                  required={true}
                  disabled={false}
                  setState={setStreet}
                />

                <div>
                  <label id="input_label" htmlFor="field_label">
                    Payment Type
                  </label>
                  <br />
                  <input
                    style={{ marginBottom: "20px", marginTop: "10px" }}
                    type="radio"
                    name="payment_method"
                    value="cash-on"
                    onChange={(e) => setPayment(e.target.value)}
                  />
                  &nbsp;&nbsp; Cash On &nbsp;&nbsp;&nbsp;
                  <input
                    type="radio"
                    name="payment_method"
                    value="stripe card"
                    onChange={(e) => setPayment(e.target.value)}
                  />
                  &nbsp;&nbsp; Card Payment
                </div>

                <FormButton
                  type="submit"
                  btn_name="Place Order"
                  processing={processing}
                  disable={processing || !products_data.length ? true : false}
                />
              </form>
            </div>
          ) : (
            <div className="billing_details_form lg:w-3/5 lg:!mt-0 !mt-15">
              <div className="title_of_details">
                <h1 className="text-medium font-semibold tracking-wider my-5 text-black2">
                  Get Paid
                </h1>
              </div>
              <StripePaymentForm amount={net_total} order_id={orderid} />
            </div>
          )}
        </div>
      ) : (
        <>
          <ErrorMessage message="No products added in cart. Please go back and add product in cart!" />
          <div className="flex items-center" style={{ marginTop: "10px" }}>
            <span>
              <NextLink href="/shop/grid_shop" passHref>
                <button
                  id="cart_btn"
                  className="!rounded-sm !text-light"
                  style={{ textTransform: "capitalize" }}
                >
                  continue shopping &nbsp;
                  <MdShoppingCart className="!text-normal" />
                </button>
              </NextLink>
            </span>
          </div>
        </>
      )}
    </>
  );
}
