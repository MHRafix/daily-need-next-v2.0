import Cookie from "js-cookie";
import dynamic from "next/dynamic";
import Image from "next/image";
import NextLink from "next/link";
import { useDispatch } from "react-redux";
import { qtyDecrease, qtyIncrease } from "../../redux/cart_products/action";
import { handleReduceCart } from "../../utilities/handleReduceCart";
// import Swal from 'sweetalert2/dist/sweetalert2.js'
// import "sweetalert2/src/sweetalert2.scss";

export default function TableBody({ carted_products }) {
  const Swal = dynamic(() => import("sweetalert2"));

  const { _id, slug, thumbnail, title, prices, quantity } = carted_products;
  const dispatch = useDispatch();

  return (
    <>
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
                Swal.fire({
                  title: "Error!",
                  text: "Do you want to continue",
                  icon: "error",
                  confirmButtonText: "Cool",
                });
                handleUpdateCart(dispatch, qtyDecrease, _id, false);
              }}
            >
              -
            </button>
            <span id="cart_qty">{quantity}</span>
            <button
              id="qty_controller"
              onClick={() => handleUpdateCart(dispatch, qtyIncrease, _id, true)}
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

const handleUpdateCart = (dispatch, updateDep, _id, dependency) => {
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
        // warningToast("Maximum quantity limit exceed!");
      }
    } else {
      if (selected_product.quantity > 1) {
        selected_product.quantity = selected_product.quantity - 1;
        dispatch(updateDep(_id));
      } else {
        // warningToast("Minimum quantity limit exceed!");
      }
    }

    const rest_cart = carted_products.filter((product) => product._id !== _id);

    rest_cart.push(selected_product);
    Cookie.set("cart_product_ids", JSON.stringify(rest_cart));
  }
};
