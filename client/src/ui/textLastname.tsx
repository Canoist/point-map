import React from "react";
import { TextField } from "@mui/material";
import ITextFieldForm from "../types/ITextFieldForm";

const TextLastname: React.FC<ITextFieldForm> = ({ error, register }) => {
    return (
        <TextField
            error={!!error.lastname}
            helperText={error.lastname && error.lastname.message}
            id="lastname"
            label="Lastname"
            variant="standard"
            margin="normal"
            {...register("lastname", {
                required: {
                    value: true,
                    message: "Поле обязательно для заполнения",
                },
                pattern: {
                    value: /^[a-zA-Zа-яА-ЯёЁ']+?$/,
                    message: "Фамилия должна состоять только из букв",
                },
                maxLength: {
                    value: 100,
                    message: "Максимальное количество символов - 100",
                },
            })}
        />
    );
};

export default TextLastname;
