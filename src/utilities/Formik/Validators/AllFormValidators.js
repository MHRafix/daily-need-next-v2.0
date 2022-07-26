import * as Yup from "yup";

export const AddProductsFormValidator = () => {
  // initia. vlaue of form
  const initialValues = {
    title: "",
    thumbnail: "",
    regular_price: "",
    sale_price: "",
    stock_available: "",
    description: "",
    weight: "",
    tags: "",
  };

  // validation schema using formik yup
  const validationSchema = Yup.object({
    title: Yup.string().required("Required! "),
    thumbnail: Yup.string().required("Required!"),
    regular_price: Yup.string().required("Required!"),
    sale_price: Yup.string().required("Required!"),
    stock_available: Yup.string().required("Required!"),
    description: Yup.string().required("Required!"),
    weight: Yup.string().required("Required!"),
    tags: Yup.string().required("Required!"),
  });
  return { initialValues, validationSchema };
};
