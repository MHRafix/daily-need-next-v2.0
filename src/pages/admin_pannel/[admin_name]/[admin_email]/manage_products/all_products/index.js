import React from "react";
import AdminPannelLayoutContainer from "../../../../../../components/admin_pannel_components/common/layout/AdminPannelLayoutContainer";
import AllProductsMain from "../../../../../../components/admin_pannel_components/components/manage_products/all_products/AllProductsMain";

export default function AllProducts() {
  return (
    <>
      <AdminPannelLayoutContainer
        title="Manage Products"
        description="This is manage products of 'Daily Needs Grocery' web application admin pannel."
      >
        <AllProductsMain />
      </AdminPannelLayoutContainer>
    </>
  );
}
