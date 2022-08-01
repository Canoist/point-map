import { AppBar, Container, Toolbar } from "@mui/material";
import React, { useState } from "react";
import { useAppSelector } from "../../store/hooks";
import { getIsLoggedIn } from "../../store/user";
import NavBarDesktop from "./navBarDesktop";
import NavBarMobile from "./navBarMobile";
import NavBarUserInfo from "./navBarUserInfo";

const NavBar: React.FC = () => {
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const isLoggedIn = useAppSelector(getIsLoggedIn());

    const tabs = isLoggedIn ? ["Main", "OwnPoints"] : ["Main"];
    const settings = ["Profile", "Logout"];

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <AppBar position="static" sx={{ mb: "1px", px: "15px" }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <NavBarDesktop onClickOpen={handleOpenNavMenu} />
                    <NavBarMobile
                        tabs={tabs}
                        onClickClose={handleCloseNavMenu}
                        anchor={anchorElNav}
                    />
                    <NavBarUserInfo settings={settings} />
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default NavBar;
