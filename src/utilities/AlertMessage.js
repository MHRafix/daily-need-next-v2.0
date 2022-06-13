import { BiError } from "react-icons/bi";
import { MdCloudDone } from "react-icons/md";

export const ErrorMessage = ({ message }) => {
  return (
    <div className="text-red-500 text-big_ultra !font-bold text-center tracking-wider">
      <h1 style={{ fontWeight: "bold!important" }}>{message}</h1>
    </div>
  );
};

export const ErrorAlert = ({ message }) => {
  return (
    <div style={{ padding: "10px" }} id="alertIdError">
      <h1 className="flex items-center">
        <BiError /> &nbsp; {message}
      </h1>
    </div>
  );
};

export const SuccessMessage = ({ message }) => {
  return (
    <div style={{ padding: "10px", background: "green" }} id="alertIdSuccess">
      <h1 className="flex items-center">
        <MdCloudDone /> &nbsp; {message}
      </h1>
    </div>
  );
};
