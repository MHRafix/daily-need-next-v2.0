import React from "react";
import AdminPannelBreadcrumb from "../../../common/admin_pannel_breadcrumb/AdminPannelBreadcrumb";

export default function LimitedProductsMain() {
  const bread_nav = "manage products / limited products";
  return (
    <>
      <AdminPannelBreadcrumb
        page_name="manage limited products"
        breadcrumb_name={bread_nav}
      />
    </>
  );
}
