import { Form } from "formik";
import NextLink from "next/link";
import { BiErrorCircle } from "react-icons/bi";
import { MdCloudDone, MdShoppingCart } from "react-icons/md";
import { useSelector } from "react-redux";
import { ErrorMessage } from "../../utilities/AlertMessage";
import {
  FormButton,
  FormikSelectField,
  FormikTextField,
} from "../../utilities/Form/FormField";
import FormikFormLayout from "../../utilities/Formik/FormikLayout/FormikFormLayout";
import { CheckoutFormValidator } from "../../utilities/Formik/Validators/AllFormValidators";
import StripePaymentForm from "../../utilities/StripePayment/StripePaymentForm";
import OrderOverview from "./OrderOverview/OrderOverview";

export default function BillingDetails() {
  // calculate net total payable amount here
  const products_data = useSelector((state) => state.cart_product.cart_list);
  let total_amount = 0;
  if (products_data) {
    for (const products of products_data) {
      total_amount =
        products?.prices?.sale_price > 0
          ? total_amount + products?.prices?.sale_price * products?.quantity
          : total_amount + products?.prices?.regular_price * products?.quantity;
    }
  }

  // net total order amount here
  const net_total = (total_amount + (total_amount / 100) * 3).toFixed(2);

  const {
    initialValues,
    validationSchema,
    onSubmit,
    processing,
    toastText,
    toastType,
    toastOn,
    setToastOn,
    paypalModal,
    orderid,
  } = CheckoutFormValidator(products_data, net_total);

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
              <FormikFormLayout
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                <Form>
                  <FormikTextField
                    form_label="your name"
                    type="text"
                    name="customer_name"
                  />

                  <FormikTextField
                    form_label="your email"
                    type="email"
                    name="customer_email"
                  />

                  <FormikTextField
                    form_label="your mobile"
                    type="tel"
                    name="customer_mobile"
                  />

                  <FormikTextField
                    form_label="your country"
                    type="text"
                    name="customer_country"
                  />
                  <FormikTextField
                    form_label="your district"
                    type="text"
                    name="customer_district"
                  />
                  <FormikTextField
                    form_label="your street"
                    type="text"
                    name="customer_street"
                  />

                  <FormikSelectField
                    form_label="payment method"
                    options={[
                      { id: 1, name: "cash-on" },
                      { id: 2, name: "stripe card" },
                    ]}
                    name="payment_method"
                  />

                  <FormButton
                    type="submit"
                    btn_name="Signin Now"
                    processing={processing}
                  />
                </Form>
              </FormikFormLayout>
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
