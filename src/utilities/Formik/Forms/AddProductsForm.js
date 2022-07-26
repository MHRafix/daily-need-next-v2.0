import { Form } from "formik";
import React from "react";
import { FormButton, FormikField, FormikFileField } from "../../Form/FormField";

export default function AddProductsForm() {
  return (
    <Form>
      <FormikField form_label="product title" type="text" name="title" />
      <label
        id="input_label"
        htmlFor="file_label"
        style={{ marginBottom: "10px", display: "block" }}
      >
        product small thumbnail
        <span id="required_sign">*</span>
      </label>
      <div className="sm:!flex xs:grid items-center justify-start">
        <FormikFileField />
      </div>

      <FormikField
        form_label="regular price"
        type="text"
        name="regular_price"
      />

      <FormikField form_label="sale price" type="text" name="sale_price" />

      <FormikField
        form_label="stock available"
        type="number"
        name="stock_available"
      />

      <FormikField form_label="description" type="text" name="description" />

      <FormikField form_label="weight" type="text" name="weight" />

      <FormikField form_label="tags" type="text" name="tags" />

      <FormButton type="submit" btn_name="submit" />
    </Form>
  );
}
