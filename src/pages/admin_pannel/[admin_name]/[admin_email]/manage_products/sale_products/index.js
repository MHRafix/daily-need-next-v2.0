import Cookie from "js-cookie";
import React from "react";
import AdminPannelLayoutContainer from "../../../../../../components/admin_pannel_components/common/layout/AdminPannelLayoutContainer";
import SaleProductsMain from "../../../../../../components/admin_pannel_components/components/manage_products/sale_products/SaleProductsMain";
import ErrorPage from "../../../../../404";

export default function SaleProducts() {
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
        title="Manage Products"
        description="This is manage products of 'Daily Needs Grocery' web application admin pannel."
      >
        <SaleProductsMain />
      </AdminPannelLayoutContainer>
    </>
  );
}
