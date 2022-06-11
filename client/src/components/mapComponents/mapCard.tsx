import { Card } from "@mui/material";
import moment from "moment";
import React from "react";
import PointProperties from "../../types/pointProperties";

interface IMapCard {
    properties: PointProperties;
}

const MapCard: React.FC<IMapCard> = ({ properties }) => {
    return (
        <Card>
            <p>{moment(properties.date).format("DD.MM.YY HH:mm")}</p>
            <h2>{properties.name}</h2>
            <p>{properties.description}</p>
        </Card>
    );
};
export default MapCard;
