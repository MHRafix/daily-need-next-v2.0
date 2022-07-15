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
import handleForm from "../../../../utilities/Form/handleForm";

export default function VerificationForm() {
  const router = useRouter();

  const isVerify = Cookie.get("user_verify")
    ? JSON.parse(Cookie.get("user_verify"))
    : false;

  const userInfo =
    Cookie.get("user_information") &&
    JSON.parse(Cookie.get("user_information"));

  // take some state for storing data
//   const [username, setUsername] = useState(userInfo?.user_name);
  const [useremail, setUseremail] = useState(userInfo?.user_email);
  const [password, setPassword] = useState("");
//   const [cnfPassword, setCnfPassword] = useState("");
//   const [userpic, setUserpic] = useState("");
  const [verifypass, setVerifypass] = useState("");
  const [verifyon, setVerifyon] = useState(isVerify.verify);

  // toast state here
  const [verifing, setVerifing] = useState(false);
  const [toastTypeV, setToastTypeV] = useState("");
  const [toastTextV, setToastTextV] = useState("");

  // make a data object
//   const user_info = {
//     user_name: username,
//     user_email: useremail,
//     user_password: password,
//     user_pic: userpic,
//     user_admin: false,
//   };

//   const {
//     toastOn,
//     setToastOn,
//     toastType,
//     toastText,
//     processing,
//     handleFormSubmit,
//   } = handleForm(user_info, cnfPassword, "my_account/update_acc_details");

//   // handle close toast here
//   const handleRemoveToast = () => {
//     setToastOn(false);
//   };

//   // auto close toast after ther 3000ms delay
//   if (toastOn) {
//     setTimeout(() => {
//       setToastOn(false);
//     }, 3000);
//   }

  // toast setting configuration here
  const toast_config = {
    toastStyle: toastType || toastTypeV,
    alertText: toastText || toastTextV,
    toastIcon:
      toastTypeV || toastType === "error_toast" ? (
        <BiErrorCircle />
      ) : (
        <MdCloudDone />
      ),
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
        setUsername(userInfo?.user_name);

        // set verify status in browser cookie
        Cookie.set("user_verify", JSON.stringify(data), {
          expires: 1, // 1 days
          secure: true,
          sameSite: "strict",
          path: "/",
        });
        setVerifyon(true);
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
       
     )}
