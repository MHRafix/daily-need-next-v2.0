import React from "react";
import AdminPannelBreadcrumb from "../../../common/admin_pannel_breadcrumb/AdminPannelBreadcrumb";

export default function ManageStockProductsMain() {
  const bread_nav = "manage products / manage stock";
  return (
    <>
      <AdminPannelBreadcrumb
        page_name="manage stock products"
        breadcrumb_name={bread_nav}
      />
    </>
  );
}
