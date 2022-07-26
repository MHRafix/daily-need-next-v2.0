import { Formik } from "formik";
import React from "react";

export default function FormikFormLayout({
  initialValues,
  validationSchema,
  onSubmit,
  children,
}) {
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {children}
      </Formik>
    </>
  );
}
