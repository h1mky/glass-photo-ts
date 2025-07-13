import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import AlertSnackbar from "../../uiComponents/Alret";

import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import { ClipLoader } from "react-spinners";

import "./createPostForm.css";
import PhotoListItem from "../../uiComponents/photoListItem";
import type { Photo } from "../../services/PostService/type";
import { useCreatePost } from "../../services/PostService/service";

import { useSelector } from "react-redux";
import { selectUserMain } from "../../redux/userSlice/selector";

import { uploadPhoto } from "../../services/supabase/service";

const CreatePostForm = () => {
  const [value, setValue] = useState("1");

  const user = useSelector(selectUserMain);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarStatus, setSnackbarStatus] = useState<
    "success" | "error" | null
  >(null);

  const {
    mutateAsync: createPost,
    isPending,
    isSuccess,
    isError,
    error,
  } = useCreatePost();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const uploadedUrl = await uploadPhoto(file);
    if (uploadedUrl) {
      formik.setFieldValue("post_img", uploadedUrl);
    }

    e.target.value = "";
  };

  const handleClose = () => {
    setSnackbarOpen(false);
  };

  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const validationSchema = Yup.object({
    title: Yup.string()
      .transform((value) => value.trim())
      .min(3, "Min 3 characters")
      .required("Required"),
    description: Yup.string()
      .transform((value) => value.trim())
      .min(2, "Min 2 characters")
      .max(128, "Max 128 characters"),
    post_img: Yup.string().url().required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      post_img: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        await createPost(values);
        resetForm();
        setSnackbarOpen(true);
        setSnackbarStatus("success");
      } catch {
        setSnackbarOpen(true);
        setSnackbarStatus("error");
      }
    },
  });

  const photoPreview: Photo = {
    id: 0,
    title: formik.values.title || "Preview Title",
    username: user?.username ? user.username : "no username",
    post_img: formik.values.post_img || "https://via.placeholder.com/300",
  };

  return (
    <Box sx={{ width: "100%", typography: "body1", minHeight: "700px" }}>
      <AlertSnackbar
        open={snackbarOpen && (isSuccess || isError)}
        onClose={handleClose}
        status={snackbarStatus}
        message={
          isSuccess
            ? "Post Created Success"
            : error instanceof Error
            ? error.message || "Post create error"
            : "Post create error"
        }
      />

      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            onChange={handleChange}
            aria-label="form tabs"
            TabIndicatorProps={{ style: { backgroundColor: "white" } }}
            sx={{
              fontFamily:
                'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
              "& .MuiTab-root": {
                flex: 1,
                textAlign: "center",
                color: "white",
                fontFamily: "inherit",
                "&.Mui-selected": { color: "gray" },
                "&:hover": { color: "gray" },
                "&.Mui-disabled": {
                  opacity: 0.5,
                  color: "#bbb",
                  cursor: "not-allowed",
                  textDecoration: "line-through",
                },
              },
            }}
          >
            <Tab label="Post Details" value="1" />
            <Tab label="Photo" value="2" />
            <Tab label="Preview" value="3" disabled={!formik.values.post_img} />
          </TabList>
        </Box>

        <form onSubmit={formik.handleSubmit} className="post-form">
          <TabPanel value="1">
            <div className="form-group">
              <input
                type="text"
                id="title"
                className="form-input"
                placeholder="Введите заголовок"
                style={{ color: "white" }}
                {...formik.getFieldProps("title")}
              />
              {formik.touched.title && formik.errors.title && (
                <div className="error-text container">
                  {formik.errors.title}
                </div>
              )}
            </div>

            <div className="form-group">
              <textarea
                id="description"
                className="form-textarea"
                rows={4}
                placeholder="Введите описание"
                style={{ color: "white" }}
                {...formik.getFieldProps("description")}
              />
            </div>
          </TabPanel>

          <TabPanel value="2">
            <div className="tab-photo-wrapper">
              <div className="file-upload-form">
                <label htmlFor="file" className="file-upload-label">
                  <div className="file-upload-design">
                    <svg viewBox="0 0 640 512" height="1em">
                      <path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"></path>
                    </svg>
                    <p>Drag and Drop</p>
                    <p>or</p>
                    <span className="browse-button">Browse file</span>
                  </div>
                  <input
                    id="file"
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*"
                  />
                </label>
              </div>
            </div>
          </TabPanel>

          <TabPanel value="3" className="tab-preview">
            <div className="preview-wrapper">
              <PhotoListItem photo={photoPreview} disableClick />
              <div className="form-actions">
                <button
                  type="submit"
                  className="btn btn-outline-light"
                  disabled={isPending}
                  onClick={() => formik.handleSubmit}
                >
                  {isPending ? <ClipLoader size={20} color="#fff" /> : "Submit"}
                </button>
              </div>
            </div>
          </TabPanel>
        </form>
      </TabContext>
    </Box>
  );
};

export default CreatePostForm;
