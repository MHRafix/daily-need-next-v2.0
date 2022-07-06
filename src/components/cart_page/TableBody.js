import Cookie from "js-cookie";
import Image from "next/image";
import NextLink from "next/link";
import { useState } from "react";
import { AiFillWarning } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { qtyDecrease, qtyIncrease } from "../../redux/cart_products/action";
import AlertToast from "../../utilities/alertToast/AlertToast";
import { handleReduceCart } from "../../utilities/handleReduceCart";

export default function TableBody({ carted_products }) {
  // destructure product information
  const { _id, slug, thumbnail, title, prices, quantity } = carted_products;
  const dispatch = useDispatch();

  // toast state here
  const [toastOn, setToastOn] = useState(false);
  const [toastType, setToastType] = useState("");
  const [toastText, setToastText] = useState("");

  // handle close toast here
  const handleRemoveToast = () => {
    // setToastText("");
    setToastOn(false);
  };

  // auto close toast after ther 3000ms delay
  if (toastOn) {
    setTimeout(() => {
      setToastOn(false);
    }, 3000);
  }

  // toast setting configuration here
  const toast_config = {
    toastStyle: toastType,
    alertText: toastText,
    toastIcon: <AiFillWarning />,
    handleRemoveToast: handleRemoveToast,
  };

  return (
    <>
      {toastOn && <AlertToast toast_config={toast_config} />}
      <div className="table_body">
        <div className="table_body_item">
          {thumbnail && (
            <Image
              src={thumbnail}
              alt="carted items thumbnail"
              width={80}
              height={80}
            />
          )}
        </div>
        <div className="table_body_item">
          <NextLink href={`/shop/singleProducts/${slug}`} passHref>
            <h3 className="text-light text-black3 cursor-pointer hover:text-info_color hover:duration-300">
              {title}
            </h3>
          </NextLink>
        </div>
        <div className="table_body_item">৳ {prices?.sale_price}</div>
        <div className="table_body_item">
          <div id="add_to_cart_area">
            <button
              id="qty_controller"
              onClick={() => {
                handleUpdateCart(
                  setToastOn,
                  setToastType,
                  setToastText,
                  dispatch,
                  qtyDecrease,
                  _id,
                  false
                );
              }}
            >
              -
            </button>
            <span id="cart_qty">{quantity}</span>
            <button
              id="qty_controller"
              onClick={() =>
                handleUpdateCart(
                  setToastOn,
                  setToastType,
                  setToastText,
                  dispatch,
                  qtyIncrease,
                  _id,
                  true
                )
              }
            >
              +
            </button>
          </div>
        </div>
        <div className="table_body_item">
          ৳ {(prices?.sale_price * quantity).toFixed(2)}
        </div>
        <div className="table_body_item">
          <span
            onClick={() => handleReduceCart(_id, dispatch)}
            className="bg-red-500 text-white cursor-pointer text-semi_medium px-extra_padding3 !rounded-sm"
            id="cart_btn"
          >
            ✖
          </span>
        </div>
      </div>
    </>
  );
}

const handleUpdateCart = (
  setToastOn,
  setToastType,
  setToastText,
  dispatch,
  updateDep,
  _id,
  dependency
) => {
  const carted_products =
    Cookie.get("cart_product_ids") &&
    JSON.parse(Cookie.get("cart_product_ids"));

  if (carted_products) {
    const selected_product = carted_products.find(
      (product) => product._id === _id
    );
    if (dependency) {
      if (selected_product.quantity < 10) {
        selected_product.quantity = selected_product.quantity + 1;
        dispatch(updateDep(_id));
      } else {
        setToastOn(true);
        setToastType("warning_toast");
        setToastText("Maximum quantity limit exceed!");
      }
    } else {
      if (selected_product.quantity > 1) {
        selected_product.quantity = selected_product.quantity - 1;
        dispatch(updateDep(_id));
      } else {
        setToastOn(true);
        setToastType("warning_toast");
        setToastText("Minimum quantity limit exceed!");
      }
    }

    const rest_cart = carted_products.filter((product) => product._id !== _id);

    rest_cart.push(selected_product);
    Cookie.set("cart_product_ids", JSON.stringify(rest_cart));
  }
};
