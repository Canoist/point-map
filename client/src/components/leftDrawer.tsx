import React from "react";
import { Divider, Drawer, List, ListItemText } from "@mui/material";
import NavBarButton from "./navBarButton";

interface ILeftDrawer {
    isOpenedDrawer: boolean,
    closeDrawer: React.MouseEventHandler,
    tabs: string[] 
}

const LeftDrawer:React.FC<ILeftDrawer> = ({ isOpenedDrawer, closeDrawer, tabs }) => {
    return (
        <Drawer
            id="menu-appbar"
            anchor="left"
            open={isOpenedDrawer}
            PaperProps={{
                elevation: 3,
                sx: { bgcolor: "primary.main" }
            }}
            sx={{ display: { md: "none" } }}
            onClose={closeDrawer}
        >
            <List sx={{ width: { xs: "120px", sm: "180px" } }}>
                {tabs.map((tab, index) => (
                    <ListItemText key={tab}>
                        {index === 0 && (
                            <Divider sx={{ borderColor: "text.disabled" }} />
                        )}
                        <NavBarButton
                            otherStyles={{ width: "100%" }}
                            page={tab}
                            onClickCloseMenu={closeDrawer}
                        />
                        <Divider sx={{ borderColor: "text.disabled" }} />
                    </ListItemText>
                ))}
            </List>
        </Drawer>
    );
};

export default LeftDrawer;
