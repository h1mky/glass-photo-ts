import { useState } from "react";
import { Link } from "react-router-dom";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useSignIn } from "../../services/UserService/service";
import { useNavigate } from "react-router-dom";

import { useFormik } from "formik";
import * as Yup from "yup";

import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { ClipLoader } from "react-spinners";

import "./sign-in.css";

const SignInForm = () => {
  const [inputType, setInputType] = useState(true);
  const inputTypePassword = inputType ? "password" : "text";
  const toggleInputType = () => setInputType((state) => !state);

  const { mutateAsync, isPending, isError, isSuccess, error } = useSignIn();

  const navigate = useNavigate();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarStatus, setSnackbarStatus] = useState<
    "success" | "error" | null
  >(null);

  const validationSchema = Yup.object({
    email: Yup.string()
      .transform((value) => value.trim())
      .email("Invalid email")
      .required("Required"),
    password: Yup.string()
      .transform((value) => value.trim())
      .min(6, "Min 6 characters")
      .required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        await mutateAsync(values);
        resetForm();
        setSnackbarOpen(true);
        setSnackbarStatus("success");

        navigate("/", { replace: true });
      } catch {
        setSnackbarOpen(true);
        setSnackbarStatus("error");
      }
    },
  });

  const handleClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className="sign-up-container">
      <Snackbar
        open={snackbarOpen && (isSuccess || isError)}
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleClose}
          severity={snackbarStatus === "success" ? "success" : "error"}
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
          <label>Password</label>
        </div>
        <div className="inputForm">
          <FaLock className="input-icon" />
          <input
            type={inputTypePassword}
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

        <button className="button-submit" disabled={isPending}>
          {isPending ? <ClipLoader size={20} color="#fff" /> : "Sign In"}
        </button>

        <p className="p">
          Don't have an account?
          <span className="span">
            <Link to={"/sign-up"}>Sign Up</Link>
          </span>
        </p>
      </form>
    </div>
  );
};

export default SignInForm;
