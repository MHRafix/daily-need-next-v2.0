import axios from "axios";
import Cookie from "js-cookie";
import { useRouter } from "next/router";
import { useState } from "react";

export default function handleForm(user_info, cnfPassword, api_url) {
  const [processing, setProcessing] = useState(false);
  const router = useRouter();

  // toast state here
  const [toastOn, setToastOn] = useState(false);
  const [toastType, setToastType] = useState("");
  const [toastText, setToastText] = useState("");

  // server req data
  const reqDep = {
    api_url,
    user_info,
    router,
    setProcessing,
    setToastOn,
    setToastText,
    setToastType,
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setProcessing(true);

    try {
      if (user_info?.user_password === cnfPassword) {
        if (user_info?.user_password) {
          if (user_info?.user_password.length > 5) {
            // send req to server
            sendReq(reqDep, "/my_account/my_profile/edit_account_details");
          } else {
            setProcessing(false);
            setToastOn(true);
            setToastType("error_toast");
            setToastText("Password must be 6 charecters!");
          }
        } else {
          // send req to server
          sendReq(reqDep, "/my_account/my_profile/dashboard");
        }
      } else {
        setProcessing(false);
        setToastOn(true);
        setToastType("error_toast");
        setToastText("Password and confirm password didn't matched!");
      }
    } catch (err) {
      setProcessing(false);
      setToastOn(true);
      setToastType("error_toast");
      setToastText(error);
    }
  };
  return {
    toastOn,
    setToastOn,
    toastType,
    toastText,
    processing,
    handleFormSubmit,
  };
}

// const send req to server with data
const sendReq = async (reqDep, redirect_url) => {
  const {
    api_url,
    user_info,
    router,
    setProcessing,
    setToastOn,
    setToastText,
    setToastType,
  } = reqDep;

  const { redirect } = router.query;
  const { data } = await axios.post(
    // `http://localhost:3000/api/${api_url}`,
    `https://daily-need.vercel.app/api/${api_url}`,
    user_info
  );

  if (data?.success) {
    setProcessing(false);
    setToastType("success_toast");
    setToastOn(true);
    setToastText(data?.success);

    Cookie.set("user_information", JSON.stringify(data), {
      expires: 30, // 30 days
      secure: true,
      sameSite: "strict",
      path: "/",
    });

    // redirect after delay
    setTimeout(() => {
      router.push(redirect || redirect_url);
    }, 2000);
  } else {
    setProcessing(false);
    setToastType("error_toast");
    setToastOn(true);
    setToastText(data?.error);
  }
};
