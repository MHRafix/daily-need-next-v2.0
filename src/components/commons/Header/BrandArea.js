import Cookie from "js-cookie";
import Image from "next/image";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { FaBars, FaUserCircle } from "react-icons/fa";
import { MdShoppingCart } from "react-icons/md";
import { useSelector } from "react-redux";
import Logo from "../../../images/logo/logo.webp";
import MiniCart from "../MiniCartArea/MiniCart/MiniCart";

export default function BrandArea({ setNavbarToggle, navbarToggle }) {
  const cart_list = useSelector((state) => state.cart_product.cart_list);

  // search dynamic query setup here using handleSearch function
  const [cartActive, setCartActive] = useState(false);
  const [keyword, setKeyword] = useState("");
  const router = useRouter();
  const handleSearch = (e) => {
    if (keyword === "") {
      alert("Empty input is not accepted!");
    } else {
      router.push(`/search_shop/${keyword}`);
    }
  };

  // logged in user data here
  const user_loggedin =
    Cookie.get("user_information") &&
    JSON.parse(Cookie.get("user_information"));

  return (
    <div className="brand_area_wrapper">
      <div className="container_wrapper">
        <div className="brand_area">
          <div className="brand_wrapper">
            <Image
              src={Logo}
              alt="site logo"
              width={127}
              height={38}
              // layout="responsive"
            />
          </div>
          <div className="serach_area">
            <input
              onChange={(e) => setKeyword(e.target.value)}
              className="search_field"
              type="search"
              placeholder="Enter keyword here..."
              required
            />
            <button className="btn btn-search" onClick={handleSearch}>
              Search
            </button>
          </div>
          <div className="cart_area">
            <div
              onClick={() => setCartActive(true)}
              className="header_action_icon"
            >
              <span className="cart_badge">
                <MdShoppingCart />
                <span className="cart_counter">{cart_list.length}</span>
              </span>
              <span className="xs:hidden lg:!block">My Cart</span>
            </div>
            {/* &nbsp;&nbsp;&nbsp; */}

            {user_loggedin ? (
              <NextLink href="/my_account/my_profile/dashboard" passHref>
                <div className="header_action_icon ml-2">
                  <Image
                    src={user_loggedin?.user_pic}
                    width={40}
                    height={40}
                    alt="user_pic"
                    className="rounded-full"
                  />
                </div>
              </NextLink>
            ) : (
              <NextLink href="/my_account/my_acc" passHref>
                <div className="header_action_icon">
                  <span className="cart_badge !mr-0">
                    <FaUserCircle />
                  </span>
                  &nbsp; <span className="xs:hidden lg:!block">My Account</span>
                </div>
              </NextLink>
            )}
            <div className="header_action_icon2">
              {navbarToggle ? (
                <button
                  className="cart_badge !mr-0"
                  onClick={() => setNavbarToggle(false)}
                >
                  ✖
                </button>
              ) : (
                <button
                  className="cart_badge !mr-0"
                  onClick={() => setNavbarToggle(true)}
                >
                  <FaBars />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* {cartActive && ( */}
      <MiniCart
        cart_products={cart_list}
        cartState={setCartActive}
        cartActive={cartActive}
      />
      {/* )} */}
    </div>
  );
}
