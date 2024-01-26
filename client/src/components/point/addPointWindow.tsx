import { Box, Dialog, Divider, Slide, Typography } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React, { useEffect, useState } from "react";
import RadioGroupRating from "./pointProperties/radioGroupRating";
import { LatLngTuple } from "leaflet";
import IPoint from "../../types/IPoint";
import AddPointAppBar from "./addPointAppBar";
import HoopProperties from "./pointProperties/hoopProperties";
import geocodeService from "../../services/geocodeService";
import IGeoCode from "../../types/IGeoCode";
import WindowLoader from "../windowLoader";
import Adress from "./pointProperties/adress";
import Court from "./court";
import { useAppDispatch } from "../../store/hooks";
import { createPoint } from "../../store/points";

interface IAddPointWindow {
    open: boolean;
    onClose: (afterSave?: boolean) => void;
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
            coordinates: latLng,
        },
    });

    const dispatch = useAppDispatch();

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
        setData(data);
    };

    const handleSave = () => {
        dispatch(createPoint(data));
        onClose(true);
    };

    return data.properties.name ? (
        <Dialog
            fullScreen
            open={open}
            onClose={() => onClose()}
            TransitionComponent={Transition}
        >
            <AddPointAppBar onClose={onClose} onSave={handleSave} />
            <Box sx={{ ml: 4, mt: 2 }}>
                <Adress adress={data.properties.name} />
                <Court />
                <RadioGroupRating
                    sx={{ mb: 2 }}
                    data={data}
                    onChange={handleChange}
                />
                <Divider />
                <Typography sx={{ my: 2, fontWeight: 600 }} component="legend">
                    Hoop:
                </Typography>
                <HoopProperties onChange={handleChange} data={data} />
            </Box>
        </Dialog>
    ) : (
        <WindowLoader />
    );
};

export default AddPointWindow;
