import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";

interface PointAddProps {
  onSubmit: any;
}

const PointAdd: React.FC<PointAddProps> = (props: PointAddProps) => {
  const { onSubmit } = props;
  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      sx={{
        boxShadow: 16,
        width: "600px",
        p: 5,
        mx: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}>
      <Typography variant="h4" sx={{ textAlign: "center", mb: 2 }}>
        Добавить точку на карту
      </Typography>
      <TextField margin="normal" label="Название точки" variant="filled" />
      <TextField
        margin="normal"
        label="Описание точки"
        variant="filled"
        multiline
      />
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h5">Введите координаты</Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <TextField
            sx={{ width: "45%" }}
            label="Широта"
            variant="filled"
            margin="normal"
          />
          <TextField
            sx={{ width: "45%" }}
            label="Долгота"
            variant="filled"
            margin="normal"
          />
        </Box>
      </Box>
      <Button
        variant="contained"
        type="submit"
        sx={{
          mt: 2,
        }}>
        Добавить
      </Button>
    </Box>
  );
};
export default PointAdd;
