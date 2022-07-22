import Cookie from "js-cookie";
import NextLink from "next/link";
import React, { useState } from "react";
import {
  MdArrowLeft,
  MdKeyboardArrowRight,
  MdKeyboardArrowUp,
} from "react-icons/md";

export default function AdminPannelLeftNav({ nav_data }) {
  const { main_nav, main_nav_link, main_nav_icon, sub_navs } = nav_data;

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
          className="main_nav_link text-black2 my-2 w-full"
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
                className="!text-normal"
              >
                <span className="text-light_purple text-normal">
                  {main_nav_icon}
                </span>
                &nbsp;&nbsp;
                <span className="w-full flex items-center justify-between">
                  {main_nav}
                  {subNavOn ? <MdKeyboardArrowUp /> : <MdKeyboardArrowRight />}
                </span>
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
                className="!text-normal"
              >
                <span className="text-light_purple text-normal">
                  {main_nav_icon}
                </span>
                &nbsp;&nbsp;
                <span className="w-full flex items-center justify-between">
                  <span className="text-left whitespace-nowrap">
                    {main_nav}{" "}
                  </span>
                  {subNavOn ? <MdKeyboardArrowUp /> : <MdKeyboardArrowRight />}
                </span>
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
          className="!text-light hover:text-light_purple hover:duration-300"
        >
          <MdArrowLeft /> &nbsp;{sub_nav_name}
        </h3>
      </NextLink>
    </>
  );
};
