import { ErrorMessage, Field } from "formik";
import Image from "next/image";
import { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import Loader from "../../images/loader/loader.gif";

export const FormTextField = ({
  form_label,
  type,
  required,
  setState,
  defaultValue,
  disabled,
}) => {
  return (
    <div id="field_wrapper">
      <label id="input_label" htmlFor="field_label">
        {form_label}
        {required && <span id="required_sign">*</span>}
      </label>
      <br />
      <input
        type={type}
        id="field_input"
        defaultValue={defaultValue}
        onChange={(e) => setState(e.target.value)}
        required={required}
        disabled={disabled}
      />
    </div>
  );
};

export const FormFileField = ({ required, setState }) => {
  return (
    <div>
      <label
        id="input_label"
        htmlFor="file"
        style={{
          width: "200px",
          height: "200px",
          display: "block",
          margin: "10px auto",
        }}
      >
        <div id="file_field_wrapper">
          <FaCloudUploadAlt />
          <input
            type="file"
            id="file"
            accept="image/*"
            onChange={(e) => setState(e.target.files[0])}
            required={required}
          />
        </div>
      </label>
    </div>
  );
};

export const FormTextArea = ({ form_label, cols, rows, required }) => {
  return (
    <div id="field_wrapper">
      <label id="input_label" htmlFor="field_label">
        {form_label}
        {required && <span id="required_sign">*</span>}
      </label>
      <br />
      <textarea id="field_input" cols={cols} rows={rows}></textarea>
    </div>
  );
};

export const FormButton = ({ type, btn_name, processing, disable }) => {
  return (
    <div id="field_wrapper" className="!w-full">
      {processing ? (
        <button
          type={type}
          id="form_btn_disabled"
          className="lg:!w-full !w-full"
          disabled={disable}
        >
          Loading...{" "}
          <Image src={Loader} alt="loader gif" width={100} height={90} />
        </button>
      ) : (
        <button
          type={type}
          id="form_btn"
          className="lg:!w-full !w-full"
          disabled={disable}
        >
          {btn_name}
        </button>
      )}
    </div>
  );
};

export const FormikField = ({ form_label, type, name }) => {
  const style = {
    padding: "8px",
    border: "1px solid #564d4d24",
    borderRadius: "2px",
    outline: "none",
    width: "100%",
    margin: "4px",
    fontSize: "15px",
    color: "#333",
  };

  return (
    <div id="field_wrapper">
      <label id="input_label" htmlFor="label">
        {form_label}
        {/* {required && <span id="required_sign">*</span>} */}
        <span id="required_sign">*</span>
      </label>
      <br />
      <Field type={type} name={name} id={name} style={style} />
      &nbsp;
      <span className="text-red-500 text-light">
        <ErrorMessage name={name} />
      </span>
    </div>
  );
};

export const FormikFileField = () => {
  const [thumbnail, setThumbnail] = useState("");

  return (
    <>
      <div>
        <label
          id="input_label"
          htmlFor="file"
          style={{
            width: "200px",
            height: "200px",
            display: "block",
            margin: "10px auto",
          }}
        >
          <div id="file_field_wrapper">
            <FaCloudUploadAlt />
            <input
              type="file"
              id="thumbnail"
              name="thumbnail"
              accept="image/*"
              onChange={(e) => setThumbnail(e.target.files[0])}
            />
          </div>
        </label>
        &nbsp;
        <span className="text-red-500 text-light">
          <ErrorMessage name="thumbnail" />
        </span>
        <br />
      </div>
      &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
      {/* preview */}
      {thumbnail && (
        <div
          style={{
            width: "200px",
            height: "200px",
          }}
        >
          <Image
            className="rounded-xl"
            src={thumbnail ? URL.createObjectURL(thumbnail) : ""}
            alt="selected image preview"
            width={200}
            height={200}
          />
        </div>
      )}
    </>
  );
};
