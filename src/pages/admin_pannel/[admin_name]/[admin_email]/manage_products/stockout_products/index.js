import React from "react";
import AdminPannelLayoutContainer from "../../../../../../components/admin_pannel_components/common/layout/AdminPannelLayoutContainer";
import StockOutProductsMain from "../../../../../../components/admin_pannel_components/components/manage_products/stock_out_products/StockOutProductsMain";

export default function AllProducts() {
  return (
    <>
      <AdminPannelLayoutContainer
        title="Manage Stock Out Products"
        description="This is manage products of 'Daily Needs Grocery' web application admin pannel."
      >
        <StockOutProductsMain />
      </AdminPannelLayoutContainer>
    </>
  );
}
