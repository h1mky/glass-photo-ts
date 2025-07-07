import { Avatar } from "@mui/material";
import { useSelector } from "react-redux";
import { selectUserMain } from "../../redux/userSlice/selector";
import { useFormik } from "formik";
import { patchUserData } from "../../services/UserService/service";
import { uploadPhoto } from "../../services/supabase/service";
import { useState } from "react";

import { Snackbar, Alert } from "@mui/material";

import "./settingsList.css";
import { ClipLoader } from "react-spinners";

const SettingsList = () => {
  const userData = useSelector(selectUserMain);

  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleClose = () => {
    setStatus("idle");
    setErrorMessage("");
  };

  const initialValues = {
    description: userData?.description || "",
    user_img: userData?.user_img || "",
  };

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const hasChanges =
        values.description !== initialValues.description ||
        values.user_img !== initialValues.user_img;

      if (!hasChanges) {
        console.log("No changes, skipping request");
        return;
      }
      setStatus("loading");
      setErrorMessage("");

      try {
        const { status: responseStatus } = await patchUserData(values);
        if (responseStatus === 200) {
          setStatus("success");
        } else {
          setStatus("error");
          setErrorMessage("Failed to Update profile");
        }
      } catch (error) {
        setStatus("error");
        console.error("Update failed", error);
      }
    },
  });

  return (
    <div className="settings-background">
      <Snackbar
        open={status === "success" || status === "error"}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        TransitionProps={{ onExited: () => setStatus("idle") }}
        onClose={handleClose}
      >
        <Alert
          sx={{ width: "100%" }}
          severity={status === "success" ? "success" : "error"}
          variant="filled"
          onClose={handleClose}
        >
          {status === "success" ? "Comment posted" : errorMessage}
        </Alert>
      </Snackbar>

      <div className="profile-container">
        <h2>Public profile</h2>

        <form onSubmit={formik.handleSubmit} className="profile-content">
          <div className="form-section">
            <div className="form-field">
              <label>Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                defaultValue={userData?.username}
                disabled
              />
            </div>

            <div className="form-field">
              <label>Bio</label>
              <textarea
                placeholder="Tell us a little bit about yourself"
                rows={3}
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
              />
            </div>

            <button
              className="submit-button btn"
              type="submit"
              disabled={
                status === "loading" || formik.isSubmitting || !formik.isValid
              }
            >
              {status === "loading" ? (
                <ClipLoader color="#ffff" size={20} />
              ) : (
                <span>Update Profile</span>
              )}
            </button>
          </div>

          <div className="avatar-section">
            <Avatar
              src={formik.values.user_img}
              alt="Profile Picture"
              sx={{ width: 150, height: 150 }}
            />
            <label className="Btn">
              Edit
              <svg viewBox="0 0 512 512" className="svg">
                <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z" />
              </svg>
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;

                  const uploadedUrl = await uploadPhoto(file);
                  if (uploadedUrl) {
                    formik.setFieldValue("user_img", uploadedUrl);
                  }
                }}
              />
            </label>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SettingsList;
