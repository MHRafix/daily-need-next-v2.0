import Cookie from "js-cookie";
import { incrementCartQty } from "../redux/cart_products/action";

export const handleAddToCart = (selected_product, dispatch, _id, qty) => {
  const isExist =
    Cookie.get("cart_product_ids") &&
    JSON.parse(Cookie.get("cart_product_ids"));

  if (isExist) {
    // if the selected product is already exist then just update the quantity
    const selected_one = isExist.find((product) => product._id === _id);
    if (selected_one) {
      const rest_cart = isExist.filter((product) => product._id !== _id);
      const updated_cart = [
        ...rest_cart,
        { _id: selected_one._id, quantity: selected_one.quantity + qty },
      ];
      Cookie.set("cart_product_ids", JSON.stringify(updated_cart), {
        expires: 10, // 10 days
        secure: true,
        sameSite: "strict",
        path: "/",
      });
    } else {
      const all = [...isExist, { _id: selected_product._id, quantity: qty }];
      Cookie.set("cart_product_ids", JSON.stringify(all), {
        expires: 10, // 10 days
        secure: true,
        sameSite: "strict",
        path: "/",
      });
    }
  } else {
    Cookie.set(
      "cart_product_ids",
      JSON.stringify([{ _id: selected_product._id, quantity: qty }], {
        expires: 10, // 10 days
        secure: true,
        sameSite: "strict",
        path: "/",
      })
    );
  }

  dispatch(incrementCartQty({ ...selected_product, quantity: qty }));
};
