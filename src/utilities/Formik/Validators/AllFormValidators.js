import axios from "axios";
import { useState } from "react";
import * as Yup from "yup";
import imageUploader from "../imageUploader";

export const AddProductsFormValidator = () => {
  const [thumbnail, setThumbnail] = useState("");
  const [bigThumbnail, setBigThumbnail] = useState("");
  const [processing, setProcessing] = useState(false);
  const [toastText, setToastText] = useState("false");
  const [toastType, setToastType] = useState("");
  const [toastOn, setToastOn] = useState(false);

  // initia. vlaue of form
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
      try {
        const { data } = await axios.post(
          // `http://localhost:3000/api/add_products`,
          "https://daily-need.vercel.app/api/add_products",
          products_data
        );

        if (data?.success) {
          setProcessing(false);
          setToastType("success_toast");
          setToastOn(true);
          setToastText(data?.success);
          resetForm({ values: "" });
        } else {
          setProcessing(false);
          setToastType("error_toast");
          setToastOn(true);
          setToastText(data?.error);
        }
      } catch (err) {
        setProcessing(false);
        setToastType("error_toast");
        setToastOn(true);
        setToastText(err.message);
      }
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
