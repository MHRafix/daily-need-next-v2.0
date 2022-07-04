import axios from "axios";
import Cookie from "js-cookie";
import { useRouter } from "next/router";
import { useState } from "react";
import { errorToast, successToast } from "../alertToast/toasts";

export default function handleForm(user_info, cnfPassword, api_url) {
  const [processing, setProcessing] = useState(false);
  const router = useRouter();

  // server req data
  const reqDep = {
    api_url,
    user_info,
    router,
    setProcessing,
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
            errorToast("Password is too short!");
          }
        } else {
          // send req to server
          sendReq(reqDep, "/my_account/my_profile/dashboard");
        }
      } else {
        setProcessing(false);
        errorToast("Password didn't matched!");
      }
    } catch (err) {
      errorToast(error);
    }
  };
  return { processing, handleFormSubmit };
}

// const send req to server with data
const sendReq = async (reqDep, redirect_url) => {
  const { api_url, user_info, router, setProcessing } = reqDep;

  const { redirect } = router.query;
  const { data } = await axios.post(
    // `http://localhost:3000/api/${api_url}`,
    `https://daily-need.vercel.app/api/${api_url}`,
    user_info
  );

  if (data?.success) {
    setProcessing(false);
    successToast(data?.success);

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
    errorToast(data.error);
  }
};
