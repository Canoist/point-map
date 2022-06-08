import React from "react";
import { TextField } from "@mui/material";
import ITextFieldForm from "../types/ITextFieldForm";

const TextFirstname: React.FC<ITextFieldForm> = ({ error, register }) => {
    return (
        <TextField
            error={!!error}
            helperText={error ? error.message : null}
            id="firstname"
            label="Имя"
            variant="standard"
            margin="normal"
            {...register("firstname", {
                required: {
                    value: true,
                    message: "Поле обязательно для заполнения",
                },
                pattern: {
                    value: /^[a-zA-Zа-яА-ЯёЁ']+?$/,
                    message: "Имя должно состоять только из букв",
                },
                maxLength: {
                    value: 80,
                    message: "Максимальное количество символов - 80",
                },
            })}
        />
    );
};

export default TextFirstname;
