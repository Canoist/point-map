import {
    AppBar,
    Box,
    Button,
    Dialog,
    Slide,
    Toolbar,
    Typography
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React from "react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import RadioGroupRating from "../radioGroupRating";

interface IAddPointWindow {
    open: boolean;
    onClose: any;
}

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const AddPointWindow: React.FC<IAddPointWindow> = ({ open, onClose }) => {
    return (
        <Dialog
            fullScreen
            open={open}
            onClose={onClose}
            TransitionComponent={Transition}
        >
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
                    <Button autoFocus color="inherit" onClick={onClose}>
                        save
                    </Button>
                </Toolbar>
            </AppBar>
            <Box sx={{ ml: 4, mt: 2 }}>
                <Typography sx={{ mb: 2 }} component="legend">
                    Court
                </Typography>
                <Typography
                    sx={{ mb: 2 }}
                    component="legend"
                    variant="subtitle2"
                >
                    Condition of the basketball court
                </Typography>
                <RadioGroupRating sx={{ mb: 2 }} />
                <Typography sx={{ mb: 2 }} component="legend">
                    Hoop
                </Typography>
                <RadioGroupRating sx={{ mb: 2 }} />
            </Box>
        </Dialog>
    );
};

export default AddPointWindow;
