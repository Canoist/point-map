import {
    Avatar,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import RoomIcon from "@mui/icons-material/Room";
import React from "react";
import PointProperties from "../../types/pointProperties";

export interface IPointList {
    pointProperties: PointProperties;
    onDelete: any;
}

const PointList: React.FC<IPointList> = ({ pointProperties, onDelete }) => {
    return (
        <List>
            <ListItem
                secondaryAction={
                    <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => {
                            onDelete(pointProperties._id);
                        }}>
                        <DeleteIcon />
                    </IconButton>
                }>
                <ListItemAvatar>
                    <Avatar>
                        <RoomIcon color="primary" />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={pointProperties.name}
                    secondary={pointProperties.description}
                />
            </ListItem>
        </List>
    );
};
export default PointList;
