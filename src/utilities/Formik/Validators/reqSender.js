import axios from "axios";
import Cookie from "js-cookie";
import Router from "next/router";

export const reqSender = async (
  products_data,
  resetForm,
  setProcessing,
  setToastText,
  setToastType,
  setToastOn,
  api_url
) => {
  try {
    const { data } = await axios.post(
      // `http://localhost:3000/api/${api_url}`,
      `https://daily-need.vercel.app/api/${api_url}`,
      products_data
    );

    if (data?.success) {
      setProcessing(false);
      setToastType("success_toast");
      setToastOn(true);
      setToastText(data?.success);
      resetForm({ values: "" });
      if (
        api_url === "my_account/signin_api" ||
        api_url === "my_account/signup_api"
      ) {
        Cookie.set("user_information", JSON.stringify(data), {
          expires: 30, // 30 days
          secure: true,
          sameSite: "strict",
          path: "/",
        });

        // redirect to aspected page
        Router.back();
      }
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
};
