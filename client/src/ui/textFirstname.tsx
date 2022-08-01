import React from "react";
import { TextField } from "@mui/material";
import ITextFieldForm from "../types/ITextFieldForm";

const TextFirstname: React.FC<ITextFieldForm> = ({ error, register }) => {
    return (
        <TextField
            error={!!error.firstname}
            helperText={error.firstname && error.firstname.message}
            id="firstname"
            label="Name"
            variant="standard"
            margin="normal"
            {...register("firstname", {
                required: {
                    value: true,
                    message: "Field is required",
                },
                pattern: {
                    value: /^[a-zA-Zа-яА-ЯёЁ']+?$/,
                    message: "Name is must have only letter's",
                },
                maxLength: {
                    value: 80,
                    message: "Max symbols - 80",
                },
            })}
        />
    );
};

export default TextFirstname;
