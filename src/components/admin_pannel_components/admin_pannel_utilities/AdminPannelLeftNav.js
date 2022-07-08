import NextLink from "next/link";
import React from "react";

export default function AdminPannelLeftNav({ nav_data }) {
  const { main_nav, main_nav_link, sub_navs, sub_nav_link } = nav_data;

  return (
    <>
      <div className="main_navs_wrapper">
        <div className="main_nav_link text-black3">
          {main_nav_link ? (
            <NextLink href={main_nav_link} passHref>
              <h3 id="admin_pannel_nav_link" className="!text-light">
                {main_nav}
              </h3>
            </NextLink>
          ) : (
            <h3>{main_nav}</h3>
          )}
        </div>
        <div className="sub_navs_wrapper pl-2 text-black4 my-2">
          <div className="sub_nav_link">
            {sub_navs?.map((sub_nav) => (
              <SubNav key={sub_nav?._id} sub_nav={sub_nav} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export const SubNav = ({ sub_nav }) => {
  const { sub_nav_name, sub_nav_link } = sub_nav;

  return (
    <>
      <NextLink href={sub_nav_link} passHref>
        <h3 id="admin_pannel_nav_link">{sub_nav_name}</h3>
      </NextLink>
    </>
  );
};
