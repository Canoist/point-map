import {
    AppBar,
    Box,
    Button,
    Dialog,
    Slide,
    Toolbar,
    Typography,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import RadioGroupRating from "../radioGroupRating";
import { LatLngExpression } from "leaflet";
import IPoint from "../../types/IPoint";

interface IAddPointWindow {
    open: boolean;
    onClose: any;
    latLng: LatLngExpression;
}

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const AddPointWindow: React.FC<IAddPointWindow> = ({
    open,
    onClose,
    latLng,
}) => {
    const [data, setData] = useState<IPoint>({
        type: "Feature",
        properties: {
            _id: `${latLng}`,
            name: "",
            description: "",
            date: Date.now(),
        },
        geometry: {
            type: "Point",
            coordinates: [60.67881898821351, 30.00185121217478],
        },
    });

    const handleChange = (data: IPoint) => {
        console.log(data);

        setData(data);
    };

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
                <RadioGroupRating
                    sx={{ mb: 2 }}
                    data={data}
                    onChange={handleChange}
                />
                <Typography sx={{ mb: 2 }} component="legend">
                    Hoop
                </Typography>
                <RadioGroupRating
                    sx={{ mb: 2 }}
                    data={data}
                    onChange={handleChange}
                />
            </Box>
        </Dialog>
    );
};

export default AddPointWindow;
