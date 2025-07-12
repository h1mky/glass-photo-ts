import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

type AlertSnackbarProps = {
  open: boolean;
  onClose: () => void;
  status: "success" | "error";
  message: string;
};

const AlertSnackbar = ({
  open,
  onClose,
  status,
  message,
}: AlertSnackbarProps) => (
  <Snackbar
    open={open}
    autoHideDuration={2000}
    onClose={onClose}
    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
  >
    <Alert
      onClose={onClose}
      severity={status}
      variant="filled"
      sx={{ width: "100%" }}
    >
      {message}
    </Alert>
  </Snackbar>
);

export default AlertSnackbar;
