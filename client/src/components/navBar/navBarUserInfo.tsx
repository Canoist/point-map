import React, { useState } from "react";
import { Avatar, Box, Divider, IconButton, Menu, Tooltip } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import NavBarMenuItem from "./navBarMenuItem";
import NavBarButton from "./navBarButton";
import { useAppSelector } from "../../store/hooks";
import { getDataStatus, getUserData } from "../../store/user";

interface INavBarUserInfo {
    settings: string[];
}

const NavBarUserInfo: React.FC<INavBarUserInfo> = ({ settings }) => {
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const isLoggedIn = useAppSelector(getDataStatus());
    const currentUser = useAppSelector(getUserData());

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <Box sx={{ flexGrow: 0 }}>
            {isLoggedIn ? (
                <>
                    <Tooltip title="Настройки">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            <Avatar sx={{ bgcolor: deepOrange[500] }}>
                                {`${
                                    currentUser!.firstname.toUpperCase()[0] +
                                    currentUser!.lastname.toUpperCase()[0]
                                }`}
                            </Avatar>
                        </IconButton>
                    </Tooltip>
                    <Menu
                        sx={{ mt: "45px" }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}>
                        {settings.map((setting) => (
                            <div key={setting}>
                                <NavBarMenuItem
                                    onClick={handleCloseUserMenu}
                                    setting={setting}
                                />
                                {setting === "Profile" && <Divider />}
                            </div>
                        ))}
                    </Menu>
                </>
            ) : (
                <NavBarButton page="Login" />
            )}
        </Box>
    );
};

export default NavBarUserInfo;
