import React from "react";
import ReactPaginationTable from "../../../../../utilities/React_Table/PaginationTable/ReactPaginationTable";
import DashboardContentLayout from "../../../admin_pannel_utilities/DashboardLayout/DashboardContentLayout";

export default function AllProductsContent({ all_products }) {
  return (
    <>
      <div className="dashboard_row_wrapper">
        <div className="manage_products_table">
          <DashboardContentLayout item_name="manage all products">
            <ReactPaginationTable PRODUCTS_DATA={all_products} />
          </DashboardContentLayout>
        </div>
      </div>
    </>
  );
}
