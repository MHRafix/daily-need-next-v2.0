import React from "react";
import AdminPannelBreadcrumb from "../../../common/admin_pannel_breadcrumb/AdminPannelBreadcrumb";

export default function StockOutProductsMain() {
  const bread_nav = "manage products / stock-out products";
  return (
    <>
      <AdminPannelBreadcrumb
        page_name="manage stock-out products"
        breadcrumb_name={bread_nav}
      />
    </>
  );
}
