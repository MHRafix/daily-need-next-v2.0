import Cookie from "js-cookie";
import { useEffect, useState } from "react";

export default function CartDataFetch() {
  const [products, setProducts] = useState([]);

  // set cart product to the redu
  const cart_cookie_products =
    Cookie.get("cart_product_ids") &&
    JSON.parse(Cookie.get("cart_product_ids"));

  useEffect(() => {
    fetch(`http://localhost:3000/api/allproducts`)
      // fetch(`https://daily-need.vercel.app/api/allproducts`)
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, [cart_cookie_products?.length]);

  const carted_products = [];

  if (cart_cookie_products) {
    for (const cart_product of cart_cookie_products) {
      const matched_cart = products?.find(
        (product) => product._id === cart_product._id
      );
      if (matched_cart) {
        matched_cart.quantity = cart_product.quantity;
        carted_products.push(matched_cart);
      }
    }
  }
  return { carted_products };
}
