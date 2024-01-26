import React from "react";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

interface IAddPointAppBar {
    onClose: any;
    onSave: () => void;
}

const AddPointAppBar: React.FC<IAddPointAppBar> = ({ onClose, onSave }) => {
    return (
        <AppBar sx={{ position: "relative" }}>
            <Toolbar>
                <IconButton
                    edge="start"
                    color="inherit"
                    onClick={onClose}
                    aria-label="close"
                >
                    <CloseIcon />
                </IconButton>
                <Typography
                    sx={{ ml: 2, flex: 1 }}
                    variant="h6"
                    component="div"
                >
                    Create a new basketball place
                </Typography>
                <Button autoFocus color="inherit" onClick={onSave}>
                    save
                </Button>
            </Toolbar>
        </AppBar>
    );
};
export default AddPointAppBar;
