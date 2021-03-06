import Image from "next/image";
import { useState } from "react";
import { BiErrorCircle } from "react-icons/bi";
import { MdCloudDone } from "react-icons/md";
import AlertToast from "../../utilities/alertToast/AlertToast";
import avatarUploader from "../../utilities/Form/avatarUploader";
import {
  FormButton,
  FormFileField,
  FormTextField,
} from "../../utilities/Form/FormField";
import handleForm from "../../utilities/Form/handleForm";

export default function SignupForm() {
  // take some state for storing data
  const [username, setUsername] = useState("");
  const [useremail, setUseremail] = useState("");
  const [password, setPassword] = useState("");
  const [cnfPassword, setCnfPassword] = useState("");
  const [userpic, setUserpic] = useState("");

  // avatar uploader hook import here
  const { avatar_upload_cloudinary } = avatarUploader(userpic);

  // make a data object
  const user_info = {
    user_name: username,
    user_email: useremail,
    user_password: password,
    userpic: userpic,
    user_admin: false,
  };

  // make request dependency obj
  const request_dependency = {
    user_info,
    cnfPassword,
    api_url: "my_account/signup_api",
    avatar_upload_cloudinary,
  };

  // handle form submit import here
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

  // auto close toast after ther 5000ms delay
  if (toastOn) {
    setTimeout(() => {
      setToastOn(false);
    }, 5000);
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

      {/* signup form here */}
      <form onSubmit={handleFormSubmit}>
        <FormTextField
          form_label="user name"
          type="text"
          required={true}
          setState={setUsername}
        />

        <FormTextField
          form_label="your email"
          type="email"
          required={true}
          setState={setUseremail}
        />

        <FormTextField
          form_label="your password"
          type="password"
          required={true}
          setState={setPassword}
        />

        <FormTextField
          form_label="re-type password"
          type="password"
          required={true}
          setState={setCnfPassword}
        />

        <label
          id="input_label"
          htmlFor="file_label"
          style={{ marginBottom: "10px", display: "block" }}
        >
          select profile pic
          <span id="required_sign">*</span>
        </label>
        <div className="sm:!flex xs:grid items-center">
          <FormFileField
            form_label="select profile pic"
            required={true}
            setState={setUserpic}
          />
          &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
          {/* preview */}
          {userpic && (
            <div
              style={{
                width: "200px",
                height: "200px",
                margin: "auto",
              }}
            >
              <Image
                className="rounded-xl"
                src={userpic ? URL.createObjectURL(userpic) : ""}
                alt="selected image preview"
                width={200}
                height={200}
              />
            </div>
          )}
        </div>
        <p className="text-light text-black4 tracking-wide my-10">
          Your personal data will be used to support your experience throughout
          this website, to manage access to your account, and for other purposes
          described in our privacy policy.
        </p>

        <FormButton
          type="submit"
          processing={processing}
          btn_name="Signup Now"
          disable={processing}
        />
      </form>
    </>
  );
}
