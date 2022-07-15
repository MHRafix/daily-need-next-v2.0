import React from "react";
import AdminPannelBreadcrumb from "../../../common/admin_pannel_breadcrumb/AdminPannelBreadcrumb";

export default function ManageStockProductsMain() {
  const bread_nav = "manage products / stock-in products";
  return (
    <>
      <AdminPannelBreadcrumb
        page_name="manage stock-in products"
        breadcrumb_name={bread_nav}
      />
    </>
  );
}
