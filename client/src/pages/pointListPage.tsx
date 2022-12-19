import { Box, Divider, List, ListItemButton, Typography } from "@mui/material";
import React from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import PointListItem from "../components/point/pointListItem";
import { useAppSelector } from "../store/hooks";
import { getPoints } from "../store/points";
import IPoint from "../types/IPoint";

const PointListPage: React.FC = () => {
    const points = useAppSelector(getPoints());
    const navigate = useNavigate();

    return (
        <Box sx={{ py: 2 }}>
            <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="span">
                List of places
            </Typography>
            <List>
                {points.length ? (
                    points.map((point: IPoint, index: number) => (
                        <div key={point.properties._id}>
                            {index === 0 && (
                                <Divider variant="inset" component="li" />
                            )}
                            <ListItemButton
                                onClick={() =>
                                    navigate({
                                        pathname: "/",
                                        search: createSearchParams({
                                            lat: point.geometry.coordinates[0].toString(),
                                            lng: point.geometry.coordinates[1].toString(),
                                        }).toString(),
                                    })
                                }
                            >
                                <PointListItem point={point} />
                            </ListItemButton>
                            <Divider variant="inset" component="li" />
                        </div>
                    ))
                ) : (
                    <Typography
                        sx={{ mt: 4, mb: 2 }}
                        variant="h6"
                        component="div"
                    >
                        You don't have any points
                    </Typography>
                )}
            </List>
        </Box>
    );
};
export default PointListPage;
