import { ErrorMessage, Field } from "formik";
import Image from "next/image";
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

// form button
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
          Loading...
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

// formik form text field
export const FormikTextField = ({ form_label, type, name, as }) => {
  const style = {
    padding: "8px",
    border: "1px solid #564d4d24",
    borderRadius: "2px",
    outline: "none",
    width: "100%",
    margin: "4px 0px",
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
      <Field as={as} type={type} name={name} id={name} style={style} />
      &nbsp;
      <span className="text-red-500 text-light">
        <ErrorMessage name={name} />
      </span>
    </div>
  );
};

// formik form select input
export const FormikSelectField = ({ form_label, type, name }) => {
  const style = {
    padding: "8px",
    border: "1px solid #564d4d24",
    borderRadius: "2px",
    outline: "none",
    width: "100%",
    margin: "4px 0px",
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
      <Field as="select" type={type} name={name} id={name} style={style}>
        <option value="fruits" selected={true}>
          Fruits
        </option>
        <option value="vegetable" selected>
          Vegetable
        </option>
        <option value="groci">Groci</option>
      </Field>
      &nbsp;
      <span className="text-red-500 text-light">
        <ErrorMessage name={name} />
      </span>
    </div>
  );
};

// formik file field
export const FormikFileField = ({ form_label, setState, type, name }) => {
  const style = {
    padding: "8px",
    border: "1px solid #564d4d24",
    borderRadius: "2px",
    outline: "none",
    width: "100%",
    margin: "4px 0px",
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
      <input
        type={type}
        accept="image/*"
        onChange={(e) => setState(e.target.files[0])}
        name={name}
        id={name}
        required
        style={style}
      />
      &nbsp;
      <span className="text-red-500 text-light">
        <ErrorMessage name={name} />
      </span>
    </div>
  );
};
