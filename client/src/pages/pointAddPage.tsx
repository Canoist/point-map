import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

interface PointAddPageProps {
    onSubmit: any;
    toMap: any;
}

const PointAddPage: React.FC<PointAddPageProps> = ({ onSubmit, toMap }) => {
    const [data, setData] = useState<any>(null);

    const handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        const newData = transformData(data);
        onSubmit(newData);
        toMap(null, 0);
    };

    function transformData(data: any) {
        return {
            type: "Feature",
            properties: {
                ID: data.lon + data.lat,
                NAME: data.NAME,
                DESCRIPTIO: data.DESCRIPTIO,
                date: Date.now(),
            },
            geometry: {
                type: "Point",
                coordinates: [Number(data.lon), Number(data.lat)],
            },
        };
    }

    const handleChange = (e: any): void => {
        const { target } = e;
        setData((prev: any) =>
            prev
                ? { ...prev, [target.id]: target.value }
                : { [target.id]: target.value }
        );
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                boxShadow: 16,
                width: "600px",
                p: 5,
                mx: "auto",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
            }}>
            <Typography variant="h4" sx={{ textAlign: "center", mb: 2 }}>
                Добавить точку на карту
            </Typography>
            <TextField
                id="NAME"
                margin="normal"
                label="Название точки"
                variant="filled"
                onChange={handleChange}
            />
            <TextField
                id="DESCRIPTIO"
                margin="normal"
                label="Описание точки"
                variant="filled"
                onChange={handleChange}
                multiline
            />
            <Box sx={{ textAlign: "center" }}>
                <Typography variant="h5">Введите координаты</Typography>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <TextField
                        sx={{ width: "45%" }}
                        id="lon"
                        label="Долгота"
                        variant="filled"
                        onChange={handleChange}
                        margin="normal"
                    />
                    <TextField
                        sx={{ width: "45%" }}
                        id="lat"
                        label="Широта"
                        variant="filled"
                        onChange={handleChange}
                        margin="normal"
                    />
                </Box>
            </Box>
            <Button
                variant="contained"
                type="submit"
                sx={{
                    mt: 2,
                }}>
                Добавить
            </Button>
        </Box>
    );
};
export default PointAddPage;
