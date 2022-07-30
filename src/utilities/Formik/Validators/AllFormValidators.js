import axios from "axios";
import Cookie from "js-cookie";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { reduceCookie } from "../../../redux/cart_products/action";
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

// checkout form validator
export const CheckoutFormValidator = (products_data, net_total) => {
  const [paypalModal, setPaypalModal] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [toastText, setToastText] = useState("");
  const [toastType, setToastType] = useState("");
  const [toastOn, setToastOn] = useState(false);
  const [orderid, setOrderid] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  const empty_data = [];

  // loggedin user info and form data state
  const userInfo =
    Cookie.get("user_information") &&
    JSON.parse(Cookie.get("user_information"));

  // initial vlaue of form
  const initialValues = {
    customer_name: userInfo?.user_name,
    customer_email: userInfo?.user_email,
    customer_mobile: "",
    customer_country: "",
    customer_district: "",
    customer_street: "",
    payment_method: "cash-on",
  };

  // validation schema using formik yup
  const validationSchema = Yup.object({
    customer_name: Yup.string().required("Required!"),
    customer_email: Yup.string()
      .email("Invalid email format!")
      .required("Required!"),
    customer_mobile: Yup.string().required("Required!"),
    customer_country: Yup.string().required("Required!"),
    customer_district: Yup.string().required("Required!"),
    customer_street: Yup.string().required("Required!"),
    payment_method: Yup.string().required("Required!"),
  });

  // on submit function here
  const onSubmit = async (values, { resetForm }) => {
    setProcessing(true);

    // destreucture the form values
    const {
      customer_name,
      customer_email,
      customer_mobile,
      customer_country,
      customer_district,
      customer_street,
      payment_method,
    } = values;

    // make a user data object for ordering the products
    const order_data = {
      products_data,
      user_email: userInfo?.user_email,
      customer_info: {
        customer_name,
        customer_email,
        customer_mobile,
        customer_country,
        customer_district,
        customer_street,
      },

      order_overview: {
        order_status: "pendding",
        total_amount: net_total,
        total_qty: products_data?.length,
        order_date: {
          date: new Date().getDate(),
          month: new Date().getMonth() + 1,
          year: new Date().getFullYear(),
        },
      },

      payment_info: {
        payment_method,
        payment_status: "due",
        customer_name,
        customer_email,
        customer_mobile,
        payment_amount: net_total,
        card_name: payment_method,
        created: "null",
        last4: "null",
        transaction: "null",
        order_id: "null",
      },
    };

    if (order_data) {
      try {
        setPaypalModal(false);

        const { data } = await axios.post(
          // "http://localhost:3000/api/checkout/place_order",
          "https://daily-need.vercel.app/api/checkout/place_order",
          order_data
        );

        if (data?.success) {
          setToastOn(true);
          setProcessing(false);
          setToastText(data.success);
          setToastType("success_toast");
          Cookie.remove("cart_product_ids");

          setTimeout(() => {
            if (payment === "cash-on") {
              router.push("/shop/grid_shop");
              dispatch(reduceCookie(empty_data));
            } else {
              setOrderid(data?.order_id);
              setPaypalModal(true);
            }
          }, 2000);
        } else {
          setToastOn(true);
          setProcessing(false);
          setToastText(data.error);
          setToastType("error_toast");
        }
      } catch (error) {
        setToastOn(true);
        setProcessing(false);
        setToastText(error.message);
        setToastType("error_toast");
      }
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
    paypalModal,
    orderid,
  };
};
