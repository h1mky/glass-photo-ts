import { Avatar } from "@mui/material";
import { useSelector } from "react-redux";
import { selectUserMain } from "../../redux/userSlice/selector";

import "./settingsList.css";
import { useFormik } from "formik";
import { patchUserData } from "../../services/UserService/service";
import { useMemo } from "react";

const SettingsList = () => {
  const userData = useSelector(selectUserMain);

  const initialValues = useMemo(
    () => ({
      description: userData?.description || "",
      user_img: userData?.user_img || "",
    }),
    [userData]
  );

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

      try {
        await patchUserData(values);
        console.log("Profile updated");
      } catch (error) {
        console.error("Update failed", error);
      }
    },
  });

  return (
    <div className="settings-background">
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

            <button className="submit-button btn" type="submit">
              <span>Update profile</span>
            </button>
          </div>

          <div className="avatar-section">
            <Avatar
              src={formik.values.user_img}
              alt="Profile Picture"
              sx={{ width: 150, height: 150 }}
            />
            <button className="Btn" type="button">
              Edit
              <svg viewBox="0 0 512 512" className="svg">
                <path d="..."></path>
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SettingsList;
