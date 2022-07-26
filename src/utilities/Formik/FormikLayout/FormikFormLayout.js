import { Formik } from "formik";
import React from "react";

export default function FormikFormLayout({
  initialValues,
  validationSchema,
  children,
}) {
  // on submit function here
  const onSubmit = (values) => {
    // api will be here
    console.log(values);
  };
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
