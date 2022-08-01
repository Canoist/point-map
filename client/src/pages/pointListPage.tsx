import { Typography } from "@mui/material";
import React from "react";
import PointList from "../components/point/pointList";
import { useAppSelector } from "../store/hooks";
import { getPoints } from "../store/points";
import IPoint from "../types/IPoint";

const PointListPage: React.FC = () => {
    const points = useAppSelector(getPoints());
    return (
        <>
            <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="span">
                Список маркеров
            </Typography>
            {points.length ? (
                points.map((point: IPoint) => (
                    <PointList
                        key={point.properties._id}
                        pointProperties={point.properties}
                    />
                ))
            ) : (
                <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                    Список пуст
                </Typography>
            )}
        </>
    );
};
export default PointListPage;
