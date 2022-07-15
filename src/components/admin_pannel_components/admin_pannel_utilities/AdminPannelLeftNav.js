import Cookie from "js-cookie";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";

export default function AdminPannelLeftNav({ nav_data }) {
  const { main_nav, main_nav_link, main_nav_icon, sub_navs, sub_nav_link } =
    nav_data;

  const query = useRouter();
  console.log(query);
  // user information
  const userInfo =
    Cookie.get("user_information") &&
    JSON.parse(Cookie.get("user_information"));

  const [subNavOn, setSubNavOn] = useState(false);

  return (
    <>
      <div className="main_navs_wrapper">
        <button
          onClick={() => {
            if (subNavOn) setSubNavOn(false);
            else setSubNavOn(true);
          }}
          className="main_nav_link text-black2"
        >
          {main_nav_link ? (
            <NextLink
              href={`/admin_pannel/${userInfo?.user_name}/${userInfo?.user_email}${main_nav_link}`}
              passHref
            >
              <h3
                id={
                  subNavOn
                    ? "admin_pannel_nav_link_active"
                    : "admin_pannel_nav_link"
                }
                className="!text-light"
              >
                <span className="text-light_purple text-normal">
                  {main_nav_icon}
                </span>
                &nbsp; {main_nav}
              </h3>
            </NextLink>
          ) : (
            <>
              <h3
                id={
                  subNavOn
                    ? "admin_pannel_nav_link_active"
                    : "admin_pannel_nav_link"
                }
                className="!text-light"
              >
                <span className="text-light_purple text-normal">
                  {main_nav_icon}
                </span>
                &nbsp; {main_nav}
              </h3>
            </>
          )}
        </button>
        {sub_navs?.length && (
          <>
            {subNavOn && (
              <div className="sub_navs_wrapper pl-2.2 text-black4">
                <div
                  className="sub_nav_link"
                  style={{ margin: "10px 0px 20px 0px" }}
                >
                  {sub_navs?.map((sub_nav) => (
                    <SubNav key={sub_nav?._id} sub_nav={sub_nav} />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}

export const SubNav = ({ sub_nav }) => {
  const { sub_nav_name, sub_nav_link } = sub_nav;

  // user information
  const userInfo =
    Cookie.get("user_information") &&
    JSON.parse(Cookie.get("user_information"));
  return (
    <>
      <NextLink
        href={`/admin_pannel/${userInfo?.user_name}/${userInfo?.user_email}${sub_nav_link}`}
        passHref
      >
        <h3
          id="admin_pannel_nav_link"
          className="hover:text-light_purple hover:duration-300"
        >
          <MdOutlineKeyboardArrowLeft /> &nbsp;{sub_nav_name}
        </h3>
      </NextLink>
    </>
  );
};
