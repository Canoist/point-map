import { AppBar, Container, Toolbar } from "@mui/material";
import React, { useState } from "react";
import { useAppSelector } from "../store/hooks";
import { getIsLoggedIn } from "../store/user";
import NavBarDesktop from "./navBarDesktop";
import NavBarMobile from "./navBarMobile";

interface NavBarProps {
  points: any;
  onSubmit: any;
  onDelete: any;
}

const NavBar: React.FC<NavBarProps> = () => {

const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const isLoggedIn = useAppSelector((getIsLoggedIn()));

    const tabs = isLoggedIn ? ["Main", "Favorites"] : ["Main"];
    // const settings = ["Profile", "Logout"];

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>)=> {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = ()=> {
        setAnchorElNav(null);
    };

    return (
        <AppBar position="static" sx={{ mb: "18px", px: "15px" }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <NavBarDesktop
                        onClickOpen={handleOpenNavMenu}
                    />
                    <NavBarMobile
                        tabs={tabs}
                        onClickClose={handleCloseNavMenu}
                        anchor={anchorElNav}
                    />
                    {/* <NavBarUserInfo settings={settings} /> */}
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default NavBar;
