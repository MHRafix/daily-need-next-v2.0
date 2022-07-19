import Cookie from "js-cookie";
import Image from "next/image";
import { useState } from "react";
import { BiErrorCircle } from "react-icons/bi";
import { MdCloudDone } from "react-icons/md";
import AlertToast from "../../../../utilities/alertToast/AlertToast";
import {
  FormButton,
  FormFileField,
  FormTextField,
} from "../../../../utilities/Form/FormField";
import handleForm from "../../../../utilities/Form/handleForm";

export default function EditFormDetails() {
  const userInfo =
    Cookie.get("user_information") &&
    JSON.parse(Cookie.get("user_information"));

  // take some state for storing data
  const [username, setUsername] = useState(userInfo?.user_name);
  const [useremail, setUseremail] = useState(userInfo?.user_email);
  const [password, setPassword] = useState("");
  const [cnfPassword, setCnfPassword] = useState("");
  const [userpic, setUserpic] = useState("");

  // avatar uploaded to cloudinary cloud service
  const avatar_upload_cloudinary = async () => {
    const data = new FormData();
    data.append("file", userpic);
    data.append("upload_preset", "mystore");
    data.append("cloud_name", "CoderXone");
    const upload_req = await fetch(
      "	https://api.cloudinary.com/v1_1/CoderXone/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const avatar_uploaded = await upload_req.json();
    return avatar_uploaded.url;
  };

  // make a data object
  const user_info = {
    user_name: username,
    user_email: useremail,
    user_password: password,
    user_pic: userpic,
    user_admin: false,
  };

  const request_dependency = {
    user_info,
    cnfPassword,
    api_url: "my_account/update_acc_details",
    avatar_upload_cloudinary,
  };

  const {
    toastOn,
    setToastOn,
    toastType,
    toastText,
    processing,
    handleFormSubmit,
  } = handleForm(request_dependency);

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
    toastStyle: toastType,
    alertText: toastText,
    toastIcon:
      toastType === "error_toast" ? <BiErrorCircle /> : <MdCloudDone />,
    handleRemoveToast: handleRemoveToast,
  };

  return (
    <>
      {/* message toast alert */}
      {toastOn && <AlertToast toast_config={toast_config} />}
      <form onSubmit={handleFormSubmit}>
        <FormTextField
          form_label="user name"
          type="text"
          defaultValue={username}
          // defaultValue={userInfo?.user_name}
          required={true}
          disabled={false}
          setState={setUsername}
        />

        <FormTextField
          form_label="new password"
          type="password"
          required={false}
          disabled={false}
          setState={setPassword}
        />

        <FormTextField
          form_label="re-type new password"
          type="password"
          required={false}
          disabled={false}
          setState={setCnfPassword}
        />

        <FormFileField
          form_label="profile pic"
          required={false}
          setState={setUserpic}
        />

        {/* preview */}
        {userpic && (
          <Image
            className="rounded-full"
            src={userpic ? URL.createObjectURL(userpic) : ""}
            alt="selected image preview"
            width={100}
            height={100}
          />
        )}

        <FormButton
          type="submit"
          processing={processing}
          btn_name="Update Details"
          disable={processing}
        />
      </form>
    </>
  );
}
