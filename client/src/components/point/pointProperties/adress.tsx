import { Divider, Typography } from "@mui/material";
import React from "react";

interface IAdress {
    adress: string;
}
const Adress: React.FC<IAdress> = ({ adress }) => {
    return (
        <>
            <Typography variant="subtitle1">Adress:</Typography>
            <Typography sx={{ mb: 2 }} variant="subtitle1">
                {adress}
            </Typography>
            <Divider />
        </>
    );
};
export default Adress;
