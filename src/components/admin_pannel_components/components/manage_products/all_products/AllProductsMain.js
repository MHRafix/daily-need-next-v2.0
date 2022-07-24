import React from "react";
import AdminPannelBreadcrumb from "../../../common/admin_pannel_breadcrumb/AdminPannelBreadcrumb";
import AllProductsContent from "./AllProductsContent";

export default function AllProductsMain({ all_products }) {
  const bread_nav = "manage products / all products";
  return (
    <>
      <AdminPannelBreadcrumb
        page_name="manage all products"
        breadcrumb_name={bread_nav}
      />
      <AllProductsContent all_products={all_products} />
    </>
  );
}
