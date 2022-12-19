import { Box } from "@mui/material";
import React from "react";
import IPoint from "../types/IPoint";

interface IPointDescription {
    point?: IPoint[];
}

const PointDescription: React.FC<IPointDescription> = ({ point }) => {
    return <Box component="form">Point Description</Box>;
};

export default PointDescription;
