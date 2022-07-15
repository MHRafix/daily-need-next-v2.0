import React from "react";
import AdminPannelLayoutContainer from "../../../../../../components/admin_pannel_components/common/layout/AdminPannelLayoutContainer";
import SaleProductsMain from "../../../../../../components/admin_pannel_components/components/manage_products/sale_products/SaleProductsMain";

export default function SaleProducts() {
  return (
    <>
      <AdminPannelLayoutContainer
        title="Manage Products"
        description="This is manage products of 'Daily Needs Grocery' web application admin pannel."
      >
        <SaleProductsMain />
      </AdminPannelLayoutContainer>
    </>
  );
}
