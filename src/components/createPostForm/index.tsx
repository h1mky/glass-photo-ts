import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import "./createPostForm.css";

const CreatePostForm = () => {
  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1", minHeight: "400px" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            onChange={handleChange}
            aria-label="lab API tabs example"
            TabIndicatorProps={{
              style: {
                backgroundColor: "white",
              },
            }}
            sx={{
              "& .MuiTab-root": {
                color: "white",
                "&.Mui-selected": {
                  color: "gray",
                },
                "&:hover": {
                  color: "gray",
                },
              },
            }}
          >
            <Tab label="Post Details" value="1" />
            <Tab label="Photo" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <form className="post-form">
            <div className="form-group">
              <label htmlFor="title">Заголовок поста</label>
              <input
                type="text"
                id="title"
                name="title"
                className="form-input"
                placeholder="Введите заголовок"
                style={{ color: "white" }}
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Описание поста</label>
              <textarea
                id="description"
                name="description"
                className="form-textarea"
                rows={4}
                placeholder="Введите описание"
                style={{ color: "white" }}
              />
            </div>
          </form>
        </TabPanel>
        <TabPanel value="2">
          <TabPanel value="2">
            <div className="tab-photo-wrapper">
              <form className="file-upload-form">
                <label htmlFor="file" className="file-upload-label">
                  <div className="file-upload-design">
                    <svg viewBox="0 0 640 512" height="1em">
                      <path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"></path>
                    </svg>
                    <p>Drag and Drop</p>
                    <p>or</p>
                    <span className="browse-button">Browse file</span>
                  </div>
                  <input id="file" type="file" />
                </label>
              </form>

              <div className="form-actions">
                <button type="button" className="btn btn-outline-light">
                  Submit
                </button>
              </div>
            </div>
          </TabPanel>
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default CreatePostForm;
