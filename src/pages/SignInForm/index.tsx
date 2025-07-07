import { useState } from "react";
import { Link } from "react-router-dom";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { fetchSignIn } from "../../services/UserService/service";
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

  const navigate = useNavigate();

  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleClose = () => {
    setStatus("idle");
    setErrorMessage("");
  };

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
    onSubmit: async (values) => {
      setStatus("loading");
      setErrorMessage("");

      try {
        const { status: responseStatus, data } = await fetchSignIn(values);

        if (responseStatus === 200) {
          setStatus("success");
          formik.resetForm();
          localStorage.setItem("authToken", data.token);
          navigate("/", { replace: true });
        } else {
          setStatus("error");
          setErrorMessage("Incorrect email or password");
        }
      } catch (err) {
        setStatus("error");
        setErrorMessage(
          err instanceof Error ? "Incorrect email or password" : "Unknown error"
        );
      }
    },
  });

  return (
    <div className="sign-up-container">
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

        <button className="button-submit" disabled={status === "loading"}>
          {status === "loading" ? (
            <ClipLoader size={20} color="#fff" />
          ) : (
            "Sign In"
          )}
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
