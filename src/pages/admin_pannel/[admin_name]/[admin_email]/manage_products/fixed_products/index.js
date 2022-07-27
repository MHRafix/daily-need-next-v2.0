import Cookie from "js-cookie";
import React from "react";
import AdminPannelLayoutContainer from "../../../../../../components/admin_pannel_components/common/layout/AdminPannelLayoutContainer";
import FixedProductsMain from "../../../../../../components/admin_pannel_components/components/manage_products/fixed_products/FixedProductsMain";
import ErrorPage from "../../../../../404";

export default function FixedProducts() {
  // render error page
  const userInfo =
    Cookie.get("user_information") &&
    JSON.parse(Cookie.get("user_information"));

  if (!userInfo?.user_admin) {
    return <ErrorPage />;
  }
  return (
    <>
      <AdminPannelLayoutContainer
        title="Fixed Products"
        description="This is fixed products of 'Daily Needs Grocery' web application admin pannel."
      >
        <FixedProductsMain />
      </AdminPannelLayoutContainer>
    </>
  );
}
