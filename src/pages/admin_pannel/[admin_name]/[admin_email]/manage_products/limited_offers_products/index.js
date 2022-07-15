import React from "react";
import AdminPannelLayoutContainer from "../../../../../../components/admin_pannel_components/common/layout/AdminPannelLayoutContainer";
import LimitedProductsMain from "../../../../../../components/admin_pannel_components/components/manage_products/limited_products/LimitedProductsMain";

export default function AllProducts() {
  return (
    <>
      <AdminPannelLayoutContainer
        title="Manage Products"
        description="This is manage products of 'Daily Needs Grocery' web application admin pannel."
      >
        <LimitedProductsMain />
      </AdminPannelLayoutContainer>
    </>
  );
}
