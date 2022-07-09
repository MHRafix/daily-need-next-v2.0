import React from "react";
import AdminPannelBreadcrumb from "../../../common/admin_pannel_breadcrumb/AdminPannelBreadcrumb";

export default function AllProductsMain() {
  const bread_nav = "manage products / all products";
  return (
    <>
      <AdminPannelBreadcrumb
        page_name="manage all products"
        breadcrumb_name={bread_nav}
      />
    </>
  );
}
