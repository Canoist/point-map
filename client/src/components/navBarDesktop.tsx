import { Box, IconButton, Typography } from "@mui/material";
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";

interface INavBarDesktop {
    onClickOpen:React.MouseEventHandler
}

const NavBarDesktop:React.FC<INavBarDesktop> = ({onClickOpen}) => {
    return (
        <>
            <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
            >
                Weather Forecast
            </Typography>
            <Box
                sx={{
                    flexGrow: 1,
                    display: { xs: "flex", md: "none" }
                }}
            >
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={onClickOpen}
                    color="inherit"
                >
                    <MenuIcon />
                </IconButton>
            </Box>
        </>
    );
};

export default NavBarDesktop;
