import React from "react";
import AdminPannelLayoutContainer from "../../../../../../components/admin_pannel_components/common/layout/AdminPannelLayoutContainer";
import FixedProductsMain from "../../../../../../components/admin_pannel_components/components/manage_products/fixed_products/FixedProductsMain";

export default function FixedProducts() {
  return (
    <>
      <AdminPannelLayoutContainer
        title="Fixed Products"
        description="This is fixed products of 'Daily Needs Grocery' web application admin pannel."
      >
        <FixedProductsMain />
      </AdminPannelLayoutContainer>
    </>
  );
}
