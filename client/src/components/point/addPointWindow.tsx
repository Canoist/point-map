import {
    AppBar,
    Button,
    Dialog,
    List,
    ListItem,
    ListItemText,
    Slide,
    Toolbar,
    Typography
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React from "react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

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
                        Sound
                    </Typography>
                    <Button autoFocus color="inherit" onClick={onClose}>
                        save
                    </Button>
                </Toolbar>
            </AppBar>
            <List>
                <ListItem button>
                    <ListItemText
                        primary="Phone ringtone"
                        secondary="Titania"
                    />
                </ListItem>
                <ListItem button>
                    <ListItemText
                        primary="Default notification ringtone"
                        secondary="Tethys"
                    />
                </ListItem>
            </List>
        </Dialog>
    );
};

export default AddPointWindow;
