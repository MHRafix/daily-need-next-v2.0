import { useState } from "react";
import { BiErrorCircle } from "react-icons/bi";
import AlertToast from "../../utilities/alertToast/AlertToast";
import { FormButton, FormTextField } from "../../utilities/Form/FormField";
import handleForm from "../../utilities/Form/handleForm";

export default function LoginForm() {
  // take some state for storing data
  const [useremail, setUseremail] = useState("");
  const [password, setPassword] = useState("");

  // let's making the login data of the user
  const user_info = {
    user_email: useremail,
    user_password: password,
  };

  // let's make the api end point
  const api_url = "my_account/signin_api";

  // handle form submit import here
  const { toastOn, setToastOn, toastText, processing, handleFormSubmit } =
    handleForm(user_info, password, api_url);

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
    toastStyle: "error_toast",
    alertText: toastText,
    toastIcon: <BiErrorCircle />,
    handleRemoveToast: handleRemoveToast,
  };

  return (
    <>
      {/* message toast alert */}
      {toastOn && <AlertToast toast_config={toast_config} />}

      {/* login form here */}
      <form onSubmit={handleFormSubmit}>
        <FormTextField
          form_label="your email"
          type="email"
          setState={setUseremail}
          required={true}
        />

        <FormTextField
          form_label="your password"
          type="password"
          setState={setPassword}
          required={true}
        />

        <FormButton
          type="submit"
          processing={processing}
          btn_name="Signin Now"
          disable={processing}
        />
        <p className="text-light text-black4 tracking-wide cursor-pointer mt-10 hover:text-red-400 hover:duration-300">
          Lost your password?
        </p>
      </form>
    </>
  );
}
