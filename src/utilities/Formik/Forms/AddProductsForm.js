import { Form } from "formik";
import React from "react";
import { FormButton, FormikField, FormikFileField } from "../../Form/FormField";

export default function AddProductsForm({ setThumbnail, setBigThumbnail }) {
  return (
    <Form>
      <FormikField form_label="product title" type="text" name="title" />
      <FormikField form_label="product slug" type="text" name="slug" />
      <FormikField form_label="product category" type="text" name="category" />

      <FormikFileField
        form_label="product thumbnail"
        setState={setThumbnail}
        type="file"
        name="thumbnail"
      />

      <FormikFileField
        form_label="product big thumbnail"
        setState={setBigThumbnail}
        type="file"
        name="thumbnail_big"
      />

      <FormikField
        form_label="regular price"
        type="number"
        name="regular_price"
      />

      <FormikField form_label="sale price" type="number" name="sale_price" />

      <FormikField
        form_label="stock available"
        type="number"
        name="stock_available"
      />

      <FormikField form_label="description" type="text" name="description" />

      <FormikField form_label="weight" type="number" name="weight" />

      <FormikField form_label="tags" type="text" name="tags" />

      <FormButton type="submit" btn_name="submit" />
    </Form>
  );
}
