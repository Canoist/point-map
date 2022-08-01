import React, { MouseEventHandler } from "react";
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface IAdornment {
    showPassword: Boolean;
    onClick: MouseEventHandler;
}

const Adornment: React.FC<IAdornment> = ({ showPassword, onClick }) => {
    return (
        <InputAdornment position="end">
            <IconButton
                aria-label="toggle password visibility"
                onClick={onClick}
                edge="end">
                {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
        </InputAdornment>
    );
};

export default Adornment;
