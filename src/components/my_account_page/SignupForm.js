import { Form } from "formik";
import { BiErrorCircle } from "react-icons/bi";
import { MdCloudDone } from "react-icons/md";
import AlertToast from "../../utilities/alertToast/AlertToast";
import {
  FormButton,
  FormikFileField,
  FormikTextField,
} from "../../utilities/Form/FormField";
import FormikFormLayout from "../../utilities/Formik/FormikLayout/FormikFormLayout";
import { RegistrationFormValidator } from "../../utilities/Formik/Validators/AllFormValidators";

export default function SignupForm() {
  const {
    initialValues,
    validationSchema,
    onSubmit,
    setUserpic,
    processing,
    toastText,
    toastType,
    toastOn,
    setToastOn,
  } = RegistrationFormValidator();

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
      <FormikFormLayout
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form>
          <FormikTextField
            form_label="user name"
            type="text"
            name="user_name"
          />

          <FormikTextField
            form_label="user email"
            type="email"
            name="user_email"
          />

          <FormikTextField
            form_label="user password"
            type="password"
            name="user_password"
          />

          <FormikTextField
            form_label="retype password"
            type="password"
            name="cnf_password"
          />

          <FormikFileField
            form_label="profile pic"
            setState={setUserpic}
            type="file"
            name="user_pic"
          />

          <p className="text-light text-black4 tracking-wide my-10">
            Your personal data will be used to support your experience
            throughout this website, to manage access to your account, and for
            other purposes described in our privacy policy.
          </p>

          <FormButton
            type="submit"
            btn_name="Signin Now"
            processing={processing}
          />
        </Form>
      </FormikFormLayout>
    </>
  );
}
