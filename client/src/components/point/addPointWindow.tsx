import { Box, Dialog, Divider, Slide, Typography } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React, { useEffect, useState } from "react";
import RadioGroupRating from "../radioGroupRating";
import { LatLngTuple } from "leaflet";
import IPoint from "../../types/IPoint";
import AddPointAppBar from "./addPointAppBar";
import HoopProperties from "./pointProperties/hoopProperties";
import geocodeService from "../../services/geocodeService";
import IGeoCode from "../../types/IGeoCode";
import WindowLoader from "../windowLoader";
import Adress from "./pointProperties/adress";
import Court from "./court";

interface IAddPointWindow {
    open: boolean;
    onClose: any;
    latLng: LatLngTuple;
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
    useEffect(() => {
        const fetchAdress = async () => {
            const adress: IGeoCode = await geocodeService.get(latLng);
            const newData = {
                ...data,
                properties: {
                    ...data.properties,
                    name: adress.properties.geocoding.label,
                },
            };
            setData(newData);
        };
        fetchAdress();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [latLng]);

    const handleChange = (data: IPoint) => {
        console.log(data);

        setData(data);
    };

    return data.properties.name ? (
        <Dialog
            fullScreen
            open={open}
            onClose={onClose}
            TransitionComponent={Transition}
        >
            <AddPointAppBar onClose={onClose} />
            <Box sx={{ ml: 4, mt: 2 }}>
                <Adress adress={data.properties.name} />
                <Court />
                <RadioGroupRating
                    sx={{ mb: 2 }}
                    data={data}
                    onChange={handleChange}
                />
                <Divider />
                <Typography sx={{ my: 2 }} component="legend">
                    Hoop
                </Typography>
                <HoopProperties onChange={handleChange} data={data} />
            </Box>
        </Dialog>
    ) : (
        <WindowLoader />
    );
};

export default AddPointWindow;
