import Cookie from "js-cookie";
import { useState } from "react";
import ShopProductArea from "./ShopProductArea";
import ShopSidebar from "./ShopSidebar";

export default function ShopArea({ products_data }) {
  const filtered_price =
    Cookie.get("price_range") && JSON.parse(Cookie.get("price_range"));

  const [sidebaron, setSidebaron] = useState(false);

  const [minRange, setMinRange] = useState(filtered_price?.minPrice);
  const [maxRange, setMaxRange] = useState(filtered_price?.maxPrice);
  const priceRangeData = { setMinRange, setMaxRange };

  const handleSetCookie = (min, max) => {
    // Cookie.set(
    //   "price_range",
    //   JSON.stringify({ minPrice: minRange, maxPrice: maxRange }),
    //   {
    //     expires: 1, // 1 days
    //     secure: true,
    //     sameSite: "strict",
    //     path: "/",
    //   }
    // );
  };

  const filtered_data = products_data.filter(
    (product) =>
      product?.prices?.regular_price >= minRange &&
      product?.prices?.regular_price <= maxRange
  );

  // Animation();

  return (
    <div className="shop_area_wrapper">
      <div className="grid_shop_area">
        <div
          className={sidebaron ? "toggle_sidebar_area" : "sidebar_area"}
          // data-aos={sidebaron && "slide-right"}
        >
          <div className="cart_header_area !bg-white !text-black2 absolute right-0 top-0 lg:hidden !p-0">
            <div
              onClick={() => setSidebaron(false)}
              id="qty_controller"
              className="!text-medium font-normal !text-white cursor-pointer !bg-gradient-to-r !from-orangee !to-orangee_red !rounded-none !p-2"
            >
              ×
            </div>
          </div>
          <ShopSidebar
            priceRangeData={priceRangeData}
            handleSetCookie={handleSetCookie}
          />
        </div>
        <div className="shop_area">
          <ShopProductArea
            products_data={filtered_data}
            sidebaron={sidebaron}
            setsidebaron={setSidebaron}
          />
        </div>
      </div>
    </div>
  );
}
