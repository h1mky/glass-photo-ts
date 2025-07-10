import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import ListItemIcon from "@mui/material/ListItemIcon";
import { Settings, LogOut } from "lucide-react";
import type { UserMain } from "../../redux/userSlice/type";

const AvatarDropdown: React.FC<UserMain> = (user) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    handleClose();
  };

  const restoreLocalStorageToken = () => {
    localStorage.removeItem("authToken");
    navigate(0);
  };

  const hoverColor = "#8ab4f8";

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            aria-label="Account settings"
          >
            <Avatar
              sx={{ width: 40, height: 40 }}
              src={user.user_img || undefined}
            ></Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              backgroundColor: "#18181A",
              color: "#fff",
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: "50%",
                transform: "translateX(50%) translateY(-50%) rotate(45deg)",
                width: 10,
                height: 10,
                bgcolor: "#323441",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "center", vertical: "top" }}
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
        disableScrollLock
      >
        <MenuItem
          onClick={() => handleNavigate(`/user/${user.id}`)}
          sx={{
            "&:hover .MuiAvatar-root": {
              opacity: 0.8,
            },
            "&:hover .menu-text": {
              color: hoverColor,
            },
          }}
        >
          <Avatar src={user.user_img || undefined} />
          <span className="menu-text">Profile</span>
        </MenuItem>
        <MenuItem
          onClick={() => handleNavigate("/settings")}
          sx={{
            "&:hover .MuiListItemIcon-root": {
              color: hoverColor,
            },
            "&:hover .menu-text": {
              color: hoverColor,
            },
          }}
        >
          <ListItemIcon>
            <Settings size={18} color="#ffffff" />
          </ListItemIcon>
          <span className="menu-text">Settings</span>
        </MenuItem>
        <MenuItem
          onClick={() => restoreLocalStorageToken()}
          sx={{
            "&:hover .MuiListItemIcon-root": {
              color: hoverColor,
            },
            "&:hover .menu-text": {
              color: hoverColor,
            },
          }}
        >
          <ListItemIcon>
            <LogOut size={18} color="#ffffff" />
          </ListItemIcon>
          <span className="menu-text">Logout</span>
        </MenuItem>
      </Menu>
    </>
  );
};

export default AvatarDropdown;
