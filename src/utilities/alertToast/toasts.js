import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// toast settings here
const toast_settings = {
  position: "top-center",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

// error toast here
export const errorToast = (alert_text) => {
  toast.error(alert_text, toast_settings);
};

// success toast here
export const successToast = (alert_text) => {
  toast.success(alert_text, toast_settings);
};

// warning toast here
export const warningToast = (alert_text) => {
  toast.warn(alert_text, toast_settings);
};
