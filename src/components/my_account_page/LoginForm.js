import { useState } from "react";
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
  const { processing, handleFormSubmit } = handleForm(
    user_info,
    password,
    api_url
  );

  return (
    <>
      {/* message toast alert */}
      {/* <ToastContainer /> */}

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
