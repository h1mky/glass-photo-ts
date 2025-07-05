import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, Menu, MenuItem, IconButton } from "@mui/material";

import type { UserMain } from "../../redux/userSlice/type";

const AvatarDropdown: React.FC<UserMain> = (user) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget); // открытие меню
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    handleClose();
  };

  return (
    <>
      <IconButton onClick={handleOpen} size="small">
        <Avatar src={user.user_img} alt="user" />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        PaperProps={{
          sx: {
            backgroundColor: "#18181a",
            color: "#8e8e93",
            mt: 1,
          },
        }}
      >
        <MenuItem onClick={() => handleNavigate(`/user/${user.id}`)}>
          Профиль
        </MenuItem>
        <MenuItem onClick={() => handleNavigate("/settings")}>
          Настройки
        </MenuItem>
        <MenuItem onClick={() => handleNavigate("/logout")}>Выйти</MenuItem>
      </Menu>
    </>
  );
};

export default AvatarDropdown;
