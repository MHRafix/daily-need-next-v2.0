import { useState } from "react";
import * as Yup from "yup";
import avatarUploader from "../../Form/avatarUploader";
import imageUploader from "../imageUploader";
import { reqSender } from "./reqSender";

// add products form validator
export const AddProductsFormValidator = () => {
  const [thumbnail, setThumbnail] = useState("");
  const [bigThumbnail, setBigThumbnail] = useState("");
  const [processing, setProcessing] = useState(false);
  const [toastText, setToastText] = useState("false");
  const [toastType, setToastType] = useState("");
  const [toastOn, setToastOn] = useState(false);

  // initial vlaue of form
  const initialValues = {
    title: "",
    slug: "",
    category: "fruits",
    regular_price: 10,
    sale_price: 0,
    stock_available: 5,
    description: "",
    weight: 1,
    tags: "",
  };

  // validation schema using formik yup
  const validationSchema = Yup.object({
    title: Yup.string().required("Required! "),
    slug: Yup.string().required("Required! "),
    regular_price: Yup.number().required("Required!"),
    sale_price: Yup.number().required("Required!"),
    stock_available: Yup.string().required("Required!"),
    description: Yup.string().required("Required!"),
    weight: Yup.string().required("Required!"),
    tags: Yup.string().required("Required!"),
  });

  // on submit function here
  const onSubmit = async (values, { resetForm }) => {
    setProcessing(true);

    // destreucture values here
    const {
      title,
      slug,
      regular_price,
      sale_price,
      description,
      weight,
      tags,
      stock_available,
      category,
    } = values;

    // avatar uploader hook import here
    const { image_upload_cloudinary } = imageUploader(thumbnail, bigThumbnail);
    const { small_thumbnail, big_thumbnail } = await image_upload_cloudinary();

    // make product data here
    const products_data = {
      title,
      slug,
      thumbnail: small_thumbnail,
      thumbnail_big: big_thumbnail,
      category,
      prices: { regular_price, sale_price },
      reviews_ratings: [{ rating: 5, review: "Recomended for every one" }],
      stock_available,
      sold_quantity: 0,
      additional_info: { description, weight, tags },
      product_status: stock_available > 0 ? "in-stock" : "stock-out",
      product_type: sale_price > 0 ? "on-sale" : "fixed-sale",
    };

    if (products_data) {
      reqSender(
        products_data,
        resetForm,
        setProcessing,
        setToastText,
        setToastType,
        setToastOn,
        "add_products"
      );
    }
  };

  return {
    initialValues,
    validationSchema,
    onSubmit,
    setThumbnail,
    setBigThumbnail,
    processing,
    toastText,
    toastType,
    toastOn,
    setToastOn,
  };
};

// login form validator
export const LoginFormValidator = () => {
  const [processing, setProcessing] = useState(false);
  const [toastText, setToastText] = useState("false");
  const [toastType, setToastType] = useState("");
  const [toastOn, setToastOn] = useState(false);

  // initial vlaue of form
  const initialValues = {
    user_email: "",
    user_password: "",
  };

  // validation schema using formik yup
  const validationSchema = Yup.object({
    user_email: Yup.string()
      .email("Invalid email format!")
      .required("Required!"),
    user_password: Yup.string().required("Required!"),
  });

  // on submit function here
  const onSubmit = async (values, { resetForm }) => {
    setProcessing(true);

    if (values) {
      reqSender(
        values,
        resetForm,
        setProcessing,
        setToastText,
        setToastType,
        setToastOn,
        "my_account/signin_api"
      );
    }
  };

  return {
    initialValues,
    validationSchema,
    onSubmit,
    processing,
    toastText,
    toastType,
    toastOn,
    setToastOn,
  };
};

// registration form validator
export const RegistrationFormValidator = () => {
  const [userpic, setUserpic] = useState("");
  const [processing, setProcessing] = useState(false);
  const [toastText, setToastText] = useState("false");
  const [toastType, setToastType] = useState("");
  const [toastOn, setToastOn] = useState(false);

  // initial vlaue of form
  const initialValues = {
    user_name: "",
    user_email: "",
    user_password: "",
    cnf_password: "",
    user_admin: false,
  };

  // validation schema using formik yup
  const validationSchema = Yup.object({
    user_name: Yup.string().required("Required!"),
    user_email: Yup.string()
      .email("Invalid email format!")
      .required("Required!"),
    user_password: Yup.string().required("Required"),
    cnf_password: Yup.string()
      .oneOf([Yup.ref("user_password"), ""], "Passwords didn't matched!")
      .required("Required"),
  });

  // on submit function here
  const onSubmit = async (values, { resetForm }) => {
    setProcessing(true);

    const { user_name, user_email, user_password, user_admin } = values;

    // upload user avatarto cloudinary
    const { avatar_upload_cloudinary } = avatarUploader(userpic);
    const user_avatar = await avatar_upload_cloudinary();

    // make user data obj
    const user_data = {
      user_name,
      user_email,
      user_password,
      user_admin,
      user_pic: user_avatar,
    };

    if (user_data) {
      reqSender(
        user_data,
        resetForm,
        setProcessing,
        setToastText,
        setToastType,
        setToastOn,
        "my_account/signup_api"
      );
    }
  };

  return {
    initialValues,
    validationSchema,
    onSubmit,
    setUserpic,
    processing,
    toastText,
    toastType,
    toastOn,
    setToastOn,
  };
};
