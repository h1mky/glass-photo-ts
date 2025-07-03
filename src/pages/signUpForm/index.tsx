import "./sign-up.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { fetchSignUp } from "../../services/UserService/service";

// FA Icons
import { FaEnvelope, FaUser, FaEye, FaEyeSlash, FaLock } from "react-icons/fa";

const SignUpForm = () => {
  const [inputType, setInputType] = useState(true);
  const toggleInputType = () => setInputType((prev) => !prev);

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
      userPhoto: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Submitting", values);
      fetchSignUp(values).then((req) => console.log(req.status));
    },
  });

  return (
    <div className="sign-up-container">
      <form className="form" onSubmit={formik.handleSubmit}>
        {/* Email */}
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
          <div className="error">{formik.errors.email}</div>
        )}

        {/* Username */}
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
          <div className="error">{formik.errors.username}</div>
        )}

        {/* Password */}
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
          <div className="error">{formik.errors.password}</div>
        )}

        {/* Submit */}
        <button type="submit" className="button-submit">
          Sign Up
        </button>

        {/* Navigation */}
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
