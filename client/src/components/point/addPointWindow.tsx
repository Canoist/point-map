import { Box, Dialog, Slide, Typography } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React, { useState } from "react";
import RadioGroupRating from "../radioGroupRating";
import { LatLngExpression } from "leaflet";
import IPoint from "../../types/IPoint";
import AddPointAppBar from "./addPointAppBar";
import HoopProperties from "./pointProperties/hoopProperties";

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
            court: "Neutral",
            hoop: [],
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
            <AddPointAppBar onClose={onClose} />
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
                <HoopProperties onChange={handleChange} data={data} />
            </Box>
        </Dialog>
    );
};

export default AddPointWindow;
