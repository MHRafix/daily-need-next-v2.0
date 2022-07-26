import React from "react";
import FormikFormLayout from "../../../../../utilities/Formik/FormikLayout/FormikFormLayout";
import AddProductsForm from "../../../../../utilities/Formik/Forms/AddProductsForm";
import { AddProductsFormValidator } from "../../../../../utilities/Formik/Validators/AllFormValidators";
import ReactPaginationTable from "../../../../../utilities/React_Table/PaginationTable/ReactPaginationTable";
import { PRODUCTS_TABLE_COLUMNS } from "../../../../../utilities/React_Table/TableColumns";
import DashboardContentLayout from "../../../admin_pannel_utilities/DashboardLayout/DashboardContentLayout";
export default function AllProductsContent({ all_products }) {
  const { initialValues, validationSchema } = AddProductsFormValidator();
  return (
    <>
      {/* add products form  */}
      <div className="dashboard_row_wrapper">
        <div className="add_products_form">
          <DashboardContentLayout item_name="add products">
            <FormikFormLayout
              initialValues={initialValues}
              validationSchema={validationSchema}
            >
              <AddProductsForm />
            </FormikFormLayout>
          </DashboardContentLayout>
        </div>
      </div>

      {/* all products managing table */}
      <div className="dashboard_row_wrapper">
        <div className="manage_products_table">
          <DashboardContentLayout item_name="manage all products">
            <ReactPaginationTable
              PRODUCTS_DATA={all_products}
              PRODUCTS_TABLE_COLUMNS={PRODUCTS_TABLE_COLUMNS}
            />
          </DashboardContentLayout>
        </div>
      </div>
    </>
  );
}
