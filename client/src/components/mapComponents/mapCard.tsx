import {
    Card,
    CardActions,
    CardContent,
    Button,
    CardMedia,
    Typography,
} from "@mui/material";
import moment from "moment";
import React from "react";
import PointProperties from "../../types/pointProperties";
import DirectionsIcon from "@mui/icons-material/Directions";

interface IMapCard {
    properties: PointProperties;
}

const MapCard: React.FC<IMapCard> = ({ properties }) => {
    return (
        <Card variant="outlined" sx={{ mt: 2 }}>
            <CardMedia
                component="img"
                height="140"
                image="https://images.unsplash.com/photo-1459961615470-ce8d59b945ee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80"
                alt="photo"
            />
            <CardContent>
                <Typography variant="caption">
                    {moment(properties.date).format("DD.MM.YY HH:mm")}
                </Typography>
                <Typography variant="h6" sx={{ mb: 2 }}>
                    {properties.name}
                </Typography>
                <Typography variant="subtitle2">
                    {properties.description}
                </Typography>
            </CardContent>
            <CardActions sx={{ display: "flex", justifyContent: "center" }}>
                <Button
                    size="small"
                    startIcon={<DirectionsIcon />}
                    variant="outlined">
                    Построить маршрут
                </Button>
            </CardActions>
        </Card>
    );
};
export default MapCard;
