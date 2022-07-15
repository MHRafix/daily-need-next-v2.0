import React from "react";
import AdminPannelBreadcrumb from "../../../common/admin_pannel_breadcrumb/AdminPannelBreadcrumb";

export default function FixedProductsMain() {
  const bread_nav = "manage products / fixed products";
  return (
    <>
      <AdminPannelBreadcrumb
        page_name="manage fixed products"
        breadcrumb_name={bread_nav}
      />
    </>
  );
}
