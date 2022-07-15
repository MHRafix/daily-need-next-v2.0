import React from "react";
import AdminPannelLayoutContainer from "../../../../../../components/admin_pannel_components/common/layout/AdminPannelLayoutContainer";
import ManageStockProductsMain from "../../../../../../components/admin_pannel_components/components/manage_products/manage_stock_products/ManageStockProductsMain";

export default function ManageStockProducts() {
  return (
    <>
      <AdminPannelLayoutContainer
        title="Manage Products"
        description="This is manage products of 'Daily Needs Grocery' web application admin pannel."
      >
        <ManageStockProductsMain />
      </AdminPannelLayoutContainer>
    </>
  );
}
