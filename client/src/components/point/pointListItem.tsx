import {
    Avatar,
    Divider,
    IconButton,
    ListItem,
    ListItemAvatar,
    ListItemText,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import RoomIcon from "@mui/icons-material/Room";
import React from "react";
import { useAppDispatch } from "../../store/hooks";
import { removePoint } from "../../store/points";
import IPoint from "../../types/IPoint";

export interface IPointList {
    point: IPoint;
}

const PointListItem: React.FC<IPointList> = ({ point }) => {
    const dispatch = useAppDispatch();

    const onDelete = (id: string) => {
        dispatch(removePoint(id));
    };

    return (
        <ListItem
            secondaryAction={
                <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => {
                        onDelete(point.properties._id);
                    }}
                >
                    <DeleteIcon />
                </IconButton>
            }
            disablePadding
        >
            <ListItemAvatar>
                <Avatar>
                    <RoomIcon color="primary" />
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={point.properties.name}
                secondary={point.properties.description}
            />
            <Divider />
        </ListItem>
    );
};
export default PointListItem;
