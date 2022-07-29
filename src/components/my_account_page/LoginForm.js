import { Form } from "formik";
import { BiErrorCircle } from "react-icons/bi";
import { MdCloudDone } from "react-icons/md";
import AlertToast from "../../utilities/alertToast/AlertToast";
import { FormButton, FormikTextField } from "../../utilities/Form/FormField";
import FormikFormLayout from "../../utilities/Formik/FormikLayout/FormikFormLayout";
import { LoginFormValidator } from "../../utilities/Formik/Validators/AllFormValidators";

export default function LoginForm() {
  const {
    initialValues,
    validationSchema,
    onSubmit,
    processing,
    toastText,
    toastType,
    toastOn,
    setToastOn,
  } = LoginFormValidator();

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

      <FormikFormLayout
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form>
          <FormikTextField
            form_label="your email"
            type="email"
            name="user_email"
          />

          <FormikTextField
            form_label="your password"
            type="password"
            name="user_password"
          />

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
