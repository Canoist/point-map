import { Typography } from "@mui/material";
import React from "react";
import PointList from "../components/point/pointList";
import IPoint from "../types/IPoint";

interface PointListPageProps {
    points: IPoint[];
    onDelete: any;
}

const PointListPage: React.FC<PointListPageProps> = ({ points, onDelete }) => {
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
                        onDelete={onDelete}
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
