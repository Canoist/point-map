import { Typography } from "@mui/material";
import React from "react";

const Court: React.FC = () => {
    return (
        <>
            <Typography sx={{ mt: 2 }} component="legend">
                Court
            </Typography>
            <Typography sx={{ mb: 2 }} component="legend" variant="subtitle2">
                Condition of the basketball court
            </Typography>
        </>
    );
};
export default Court;
