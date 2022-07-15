import React from "react";
import AdminPannelBreadcrumb from "../../../common/admin_pannel_breadcrumb/AdminPannelBreadcrumb";

export default function SaleProductsMain() {
  const bread_nav = "manage products / sale products";
  return (
    <>
      <AdminPannelBreadcrumb
        page_name="manage sale products"
        breadcrumb_name={bread_nav}
      />
    </>
  );
}
