import "./sign-up.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSignUp } from "../../services/UserService/service";

import { FaEnvelope, FaUser, FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import { ClipLoader } from "react-spinners";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

const SignUpForm = () => {
  const [inputType, setInputType] = useState(true);
  const toggleInputType = () => setInputType((prev) => !prev);

  const { mutateAsync, isPending, isSuccess, isError, error } = useSignUp();

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string()
      .transform((value) => value.trim())
      .email("Invalid email")
      .required("Required"),
    username: Yup.string()
      .transform((value) => value.trim())
      .min(3, "Min 3 characters")
      .required("Required"),
    password: Yup.string()
      .transform((value) => value.trim())
      .min(6, "Min 6 characters")
      .required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        await mutateAsync(values);
        setSnackbarOpen(true);
        resetForm();
      } catch {
        setSnackbarOpen(true);
      }
    },
  });

  const handleClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className="sign-up-container">
      <title>Sign-up</title>
      <Snackbar
        open={snackbarOpen && (isSuccess || isError)}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleClose}
          severity={isSuccess ? "success" : "error"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {isSuccess
            ? "Registered successfully"
            : error instanceof Error
            ? error.message || "Registration error"
            : "Registration error"}
        </Alert>
      </Snackbar>

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

        <button type="submit" className="button-submit" disabled={isPending}>
          {isPending ? <ClipLoader size={20} color="#fff" /> : "Sign Up"}
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
