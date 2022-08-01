import { Box, Typography } from "@mui/material";
import React from "react";
import LeftDrawer from "./leftDrawer";
import NavBarButton from "./navBarButton";

interface INavBarMobile {
    tabs: string[];
    onClickClose: React.MouseEventHandler;
    anchor: null | HTMLElement;
}

const NavBarMobile: React.FC<INavBarMobile> = ({
    tabs,
    onClickClose,
    anchor,
}) => {
    return (
        <>
            <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{
                    flexGrow: 1,
                    display: { xs: "flex", md: "none" },
                }}>
                Basket Point
            </Typography>
            <Box
                sx={{
                    flexGrow: 1,
                    display: { xs: "none", md: "flex" },
                }}>
                {tabs.map((tab) => (
                    <NavBarButton
                        otherStyles={{ heigth: "100%" }}
                        key={tab}
                        page={tab}
                        onClickCloseMenu={onClickClose}
                    />
                ))}
            </Box>

            <LeftDrawer
                tabs={tabs}
                closeDrawer={onClickClose}
                isOpenedDrawer={Boolean(anchor)}
            />
        </>
    );
};

export default NavBarMobile;
