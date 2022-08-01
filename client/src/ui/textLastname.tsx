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
                    message: "Field is required",
                },
                pattern: {
                    value: /^[a-zA-Zа-яА-ЯёЁ']+?$/,
                    message: "Lastname must have only letter's",
                },
                maxLength: {
                    value: 100,
                    message: "Max symbols - 100",
                },
            })}
        />
    );
};

export default TextLastname;
