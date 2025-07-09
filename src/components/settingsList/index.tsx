import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Avatar, Snackbar, Alert } from "@mui/material";
import { ClipLoader } from "react-spinners";
import { useFormik } from "formik";

import { selectUserMain } from "../../redux/userSlice/selector";
import { uploadPhoto } from "../../services/supabase/service";
import { usePatchUser } from "../../services/UserService/service";

import "./settingsList.css";

const SettingsList = () => {
  const userData = useSelector(selectUserMain);
  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const mutation = usePatchUser();

  const formik = useFormik({
    initialValues: {
      description: userData?.description || "",
      user_img: userData?.user_img || "",
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      const hasChanges =
        values.description !== userData?.description ||
        values.user_img !== userData?.user_img;

      if (!hasChanges) return;

      mutation.mutate(values, {
        onSuccess: () => setShowAlert(true),
        onError: () => (err) => {
          setErrorMessage(err?.message || "Update failed");
          setShowAlert(true);
        },
      });
    },
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const uploadedUrl = await uploadPhoto(file);
    if (uploadedUrl) {
      formik.setFieldValue("user_img", uploadedUrl);
    }
  };

  const handleClose = () => {
    setShowAlert(false);
    setErrorMessage("");
  };

  if (!userData?.id) {
    return (
      <div className="unauth-message">
        <h3>Access denied</h3>
        <p className="m-3">
          You need to be logged in to view or update your profile settings.
        </p>
        <Link
          to="/sign-in"
          className="auth-btn_settings btn-outline-dark sign-in-style"
        >
          <span className="button-text">Sign In</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="settings-background">
      <Snackbar
        open={showAlert}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        onClose={handleClose}
      >
        <Alert
          severity={mutation.isError ? "error" : "success"}
          variant="filled"
          onClose={handleClose}
          sx={{ width: "100%" }}
        >
          {mutation.isError ? errorMessage : "Profile updated"}
        </Alert>
      </Snackbar>

      <div className="profile-container">
        <h2>Public profile</h2>
        <form onSubmit={formik.handleSubmit} className="profile-content">
          <div className="form-section">
            <div className="form-field">
              <label>Name</label>
              <input
                className="input-settings"
                type="text"
                value={userData.username}
                disabled
              />
            </div>

            <div className="form-field">
              <label>Bio</label>
              <textarea
                rows={3}
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                placeholder="Tell us a little bit about yourself"
              />
            </div>

            <button
              className="submit-button btn-settings"
              type="submit"
              disabled={formik.isSubmitting || !formik.isValid}
            >
              {formik.isSubmitting ? (
                <ClipLoader color="#fff" size={20} />
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
                <path d="..." />
              </svg>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
            </label>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SettingsList;
