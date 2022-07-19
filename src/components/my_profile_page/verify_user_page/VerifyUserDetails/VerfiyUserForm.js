import axios from "axios";
import Cookie from "js-cookie";
import { useRouter } from "next/router";
import { useState } from "react";
import { BiErrorCircle } from "react-icons/bi";
import { MdCloudDone } from "react-icons/md";
import AlertToast from "../../../../utilities/alertToast/AlertToast";
import {
  FormButton,
  FormTextField,
} from "../../../../utilities/Form/FormField";

export default function VerifyUserForm() {
  const router = useRouter();

  const isVerify = Cookie.get("user_verify")
    ? JSON.parse(Cookie.get("user_verify"))
    : false;

  const userInfo =
    Cookie.get("user_information") &&
    JSON.parse(Cookie.get("user_information"));

  // if verified then redirect to edit account details page
  if (userInfo && isVerify) {
    router.push("/my_account/my_profile/edit_account_details");
  }

  // take some state for storing data
  const [useremail, setUseremail] = useState(userInfo?.user_email);

  const [verifypass, setVerifypass] = useState("");

  // toast state here
  const [verifing, setVerifing] = useState(false);
  const [toastTypeV, setToastTypeV] = useState("");
  const [toastTextV, setToastTextV] = useState("");
  const [toastOn, setToastOn] = useState(false);

  // handle close toast here
  const handleRemoveToast = () => {
    setToastOn(false);
  };

  // auto close toast after ther 3000ms delay
  if (toastOn) {
    setTimeout(() => {
      setToastOn(false);
    }, 3000);
  }

  // toast setting configuration here
  const toast_config = {
    toastStyle: toastTypeV,
    alertText: toastTextV,
    toastIcon:
      toastTypeV === "error_toast" ? <BiErrorCircle /> : <MdCloudDone />,
    handleRemoveToast: handleRemoveToast,
  };

  const handleVerifyUser = async (e) => {
    e.preventDefault();
    setVerifing(true);

    if (verifypass.length < 6) {
      setToastOn(true);
      setVerifing(false);
      setToastTextV("Password must be 6 charecters!");
      setToastTypeV("error_toast");
    } else {
      const { data } = await axios.post(
        // "http://localhost:3000/api/my_account/verify_user",
        "https://daily-need.vercel.app/api/my_account/verify_user",
        { verifypass, useremail }
      );

      if (data?.success) {
        setToastOn(true);
        setVerifing(false);
        setToastTextV(data?.success);
        setToastTypeV("success_toast");
        // setUsername(userInfo?.user_name);

        // set verify status in browser cookie
        Cookie.set("user_verify", JSON.stringify({ verify: data?.verify }), {
          expires: 1, // 1 days
          secure: true,
          sameSite: "strict",
          path: "/",
        });
        router.push("/my_account/my_profile/edit_account_details");
      } else {
        setToastOn(true);
        setVerifing(false);
        setToastTextV(data?.error);
        setToastTypeV("error_toast");
      }
    }
  };

  return (
    <>
      {/* message toast alert */}
      {toastOn && <AlertToast toast_config={toast_config} />}

      <form onSubmit={handleVerifyUser}>
        <FormTextField
          form_label="Current password"
          type="password"
          required={true}
          disabled={false}
          setState={setVerifypass}
        />

        <FormButton
          type="submit"
          processing={verifing}
          btn_name="Verify First"
          disable={verifing}
        />
      </form>
    </>
  );
}
