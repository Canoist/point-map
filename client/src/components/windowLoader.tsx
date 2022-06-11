import React from "react";
import { Backdrop, CircularProgress } from "@mui/material";

const WindowLoader: React.FC = () => {
    return (
        <Backdrop
            sx={{
                color: "#fff",
                zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
            open={true}>
            <CircularProgress />
        </Backdrop>
    );
};

export default WindowLoader;
