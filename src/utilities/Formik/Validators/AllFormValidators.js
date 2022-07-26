import { useState } from "react";
import * as Yup from "yup";
import imageUploader from "../imageUploader";

export const AddProductsFormValidator = () => {
  const [thumbnail, setThumbnail] = useState("");
  const [bigThumbnail, setBigThumbnail] = useState("");
  // initia. vlaue of form
  const initialValues = {
    title: "",
    regular_price: 2,
    sale_price: 1,
    stock_available: 1,
    description: "",
    weight: 1,
    tags: "",
  };

  // validation schema using formik yup
  const validationSchema = Yup.object({
    title: Yup.string().required("Required! "),
    regular_price: Yup.number().required("Required!"),
    sale_price: Yup.number().required("Required!"),
    stock_available: Yup.string().required("Required!"),
    description: Yup.string().required("Required!"),
    weight: Yup.string().required("Required!"),
    tags: Yup.string().required("Required!"),
  });

  // on submit function here
  const onSubmit = async (values) => {
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
    const { small_thumbnail, big_thumbnail } =
      await thuimage_upload_cloudinary();

    // make product data here
    const products_data = {
      title,
      slug,
      category,
      prices: { regular_price, sale_price },
      stock_available,
      sold_quantity: 0,
      additional_info: { description, weight, tags },
    };
  };

  return {
    initialValues,
    validationSchema,
    onSubmit,
    setThumbnail,
    setBigThumbnail,
  };
};

// {
//   title: { type: String, required: true },
//   slug: { type: String, required: true, unique: true },
//   thumbnail: { type: Object, required: true },
//   thumbnail_big: { type: Object, required: true },
//   prices: {
//     regular_price: { type: Number, required: true },
//     sale_price: { type: Number, required: true },
//   },
//   category: { type: String, required: true },
//   reviews_ratings: [{ rating: Number, review: String }],
//   stock_available: { type: Number, required: true },
//   sold_quantity: { type: Number, required: true },
//   additional_info: {
//     description: { type: String, required: true },
//     weight: { type: String, required: true },
//     tags: [String],
//   },
//   product_status: { type: String, required: true },
//   product_type: { type: String, default: "fixed-sale" },
// },
