import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import RoomIcon from "@mui/icons-material/Room";
import React from "react";

interface PointListProps {
  points: any;
  onDelete: any;
}

const PointList: React.FC<PointListProps> = (props: PointListProps) => {
  const { points, onDelete } = props;
  return (
    <>
      <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="span">
        Список маркеров
      </Typography>
      {points.length ? (
        points.map(
          (point: {
            properties: {
              ID: string;
              NAME: string;
              DESCRIPTIO: string;
            };
          }) => (
            <span key={point.properties.ID}>
              <List component="div">
                <ListItem
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => {
                        onDelete(point.properties.ID);
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
                    primary={point.properties.NAME}
                    secondary={point.properties.DESCRIPTIO}
                  />
                </ListItem>
              </List>
            </span>
          )
        )
      ) : (
        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
          Список пуст
        </Typography>
      )}
    </>
  );
};
export default PointList;
