import Cookie from "js-cookie";
import NextLink from "next/link";
import React from "react";

export default function AdminPannelBreadcrumb({ page_name, breadcrumb_name }) {
  const userInfo =
    Cookie.get("user_information") &&
    JSON.parse(Cookie.get("user_information"));

  return (
    <>
      <div className="flex justify-between items-center mb-5">
        {/* page name */}
        <div id="page_content_title">
          <h1
            id="content_title"
            className="!text-normal !text-light_purple tracking-wider"
          >
            {page_name}
          </h1>
          <span id="border_line" className="!bg-light_purple"></span>
          <span id="border_line" className="!bg-light_purple"></span>
        </div>

        {/* breadcrumb */}
        {breadcrumb_name && (
          <div>
            <NextLink
              href={`/admin_pannel/${userInfo?.user_name}/${userInfo?.user_email}/admin_dashboard`}
              passHref
            >
              <span className="text-black3 tracking-wider capitalize font-semibold cursor-pointer hover:text-light_purple hover:duration-300">
                dashboard
              </span>
            </NextLink>
            &nbsp;
            <span className="text-black4 tracking-wider capitalize">
              / {breadcrumb_name}
            </span>
          </div>
        )}
      </div>
    </>
  );
}
