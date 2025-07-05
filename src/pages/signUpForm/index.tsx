import "./sign-up.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { fetchSignUp } from "../../services/UserService/service";

import { FaEnvelope, FaUser, FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import { ClipLoader } from "react-spinners";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

const SignUpForm = () => {
  const [inputType, setInputType] = useState(true);
  const toggleInputType = () => setInputType((prev) => !prev);

  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleClose = () => {
    setStatus("idle");
    setErrorMessage("");
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Required"),
    username: Yup.string().min(3, "Min 3 characters").required("Required"),
    password: Yup.string().min(6, "Min 6 characters").required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setStatus("loading");
      setErrorMessage("");

      try {
        const { status: responseStatus } = await fetchSignUp(values);

        if (responseStatus === 201) {
          setStatus("success");
          formik.resetForm();
        } else {
          setStatus("error");
          setErrorMessage(`this email or username is already in use`);
        }
      } catch (err) {
        setStatus("error");
        setErrorMessage(
          err instanceof Error
            ? `this email or username is already in use`
            : "Unknown error"
        );
      }
      values.email = "";
      values.password = "";
      values.username = "";
    },
  });

  return (
    <div className="sign-up-container">
      {/* Snackbar Alert */}
      <Snackbar
        open={status === "success" || status === "error"}
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        TransitionProps={{ onExited: () => setStatus("idle") }}
      >
        <Alert
          onClose={handleClose}
          severity={status === "success" ? "success" : "error"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {status === "success" ? "Registered successfully" : errorMessage}
        </Alert>
      </Snackbar>

      {/* Form */}
      <form className="form" onSubmit={formik.handleSubmit}>
        <div className="flex-column">
          <label>Email</label>
        </div>
        <div className="inputForm">
          <FaEnvelope className="input-icon" />
          <input
            type="text"
            className="input"
            placeholder="Enter your Email"
            {...formik.getFieldProps("email")}
          />
        </div>
        {formik.touched.email && formik.errors.email && (
          <div className="error-text">{formik.errors.email}</div>
        )}

        <div className="flex-column">
          <label>Username</label>
        </div>
        <div className="inputForm">
          <FaUser className="input-icon" />
          <input
            type="text"
            className="input"
            placeholder="Choose a Username"
            {...formik.getFieldProps("username")}
          />
        </div>
        {formik.touched.username && formik.errors.username && (
          <div className="error-text">{formik.errors.username}</div>
        )}

        <div className="flex-column">
          <label>Password</label>
        </div>
        <div className="inputForm">
          <FaLock className="input-icon" />
          <input
            type={inputType ? "password" : "text"}
            className="input"
            placeholder="Enter your Password"
            {...formik.getFieldProps("password")}
          />
          {inputType ? (
            <FaEye className="eye-icon" onClick={toggleInputType} />
          ) : (
            <FaEyeSlash className="eye-icon" onClick={toggleInputType} />
          )}
        </div>
        {formik.touched.password && formik.errors.password && (
          <div className="error-text">{formik.errors.password}</div>
        )}

        <button
          type="submit"
          className="button-submit"
          disabled={status === "loading"}
        >
          {status === "loading" ? (
            <ClipLoader size={20} color="#fff" />
          ) : (
            "Sign Up"
          )}
        </button>

        <p className="p">
          Already have an account?{" "}
          <span className="span">
            <Link to={"/sign-in"}>Sign In</Link>
          </span>
        </p>
      </form>
    </div>
  );
};

export default SignUpForm;
