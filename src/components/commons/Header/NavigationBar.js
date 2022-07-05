import Cookie from "js-cookie";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Animate from "react-smooth/lib/Animate";
import { header_navigation } from "../../../fake_data/all_fakedata";
import { reduceCookie } from "../../../redux/cart_products/action";
import animation from "../../../utilities/animation";

// big device navigation here
export function NavigationBarBigDev() {
  // fetching all data from the server
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:3000/api/allproducts`)
      // fetch(`https://daily-need.vercel.app/api/allproducts`)
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  // set cart product to the redu
  const cart_cookie_products =
    Cookie.get("cart_product_ids") &&
    JSON.parse(Cookie.get("cart_product_ids"));

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
    setTimeout(() => {
      dispatch(reduceCookie(carted_products));
    }, 100);
  }

  return (
    <div className="navigation_wrapper">
      <div className="container_wrapper">
        <div className="navbars">
          {header_navigation.map((link) => (
            <NextLink key={link._id} href={link.href} passHref>
              <span className="nav_link_href">{link.menu_name}</span>
            </NextLink>
          ))}
        </div>
      </div>
    </div>
  );
}

// mini device navigation here
export function NavigationBarMinDev() {
  // handle search input here
  const [keyword, setKeyword] = useState("");
  const router = useRouter();
  const handleSearch = (e) => {
    if (keyword === "") {
      alert("Empty input is not accepted!");
    } else {
      router.push(`/search_shop/${keyword}`);
    }
  };

  // call the animation and init here
  const { steps_navigation } = animation();

  return (
    <Animate steps={steps_navigation}>
      <div className="mini_navigation_wrapper">
        <div className="container_wrapper">
          {/* search area in mini navbars */}
          <div className="serach_area2">
            <input
              onChange={(e) => setKeyword(e.target.value)}
              className="search_field !w-full mb-3"
              type="search"
              placeholder="Enter keyword here..."
              required
            />
            <button className="btn btn-search !w-full" onClick={handleSearch}>
              Search By Name
            </button>
          </div>
          <div className="mini_navbars">
            {header_navigation.map((link) => (
              <NextLink key={link._id} href={link.href} passHref>
                <div className="nav_link_href_big">{link.menu_name}</div>
              </NextLink>
            ))}
          </div>
        </div>
      </div>
    </Animate>
  );
}
