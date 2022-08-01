import { Box, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getAuthErrors, signUp } from "../store/user";
import sxForm from "../styles/sxForm";
import ILogin from "../types/ILogin";
import Adornment from "./adornment";
import LinkToForm from "./linkToForm";
import SignInButton from "./signInButton";
import TextFirstname from "./textFirstname";
import TextLastname from "./textLastname";
import TitleForm from "./titleForm";

export interface IFormInputs {
    firstname: string;
    lastname: string;
    password: string;
    email: string;
}

const RegisterForm: React.FC<ILogin> = ({ toggleForm }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [authError, setAuthError] = useState<any>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IFormInputs>();

    const loginError = useAppSelector(getAuthErrors());
    useEffect(() => {
        setAuthError(loginError);
    }, [loginError]);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const onSubmit: SubmitHandler<IFormInputs> = (data: any) => {
        const newData = { ...data, points: [] };
        dispatch(signUp(newData, navigate));
    };
    return (
        <Box component="form" sx={sxForm} onSubmit={handleSubmit(onSubmit)}>
            <TitleForm />
            <TextFirstname error={errors} register={register} />
            <TextLastname error={errors} register={register} />
            <TextField
                error={!!errors.password}
                helperText={errors.password && errors.password.message}
                id="password"
                label="Password"
                variant="standard"
                margin="normal"
                {...register("password", {
                    required: {
                        value: true,
                        message: "Field is required",
                    },
                    minLength: {
                        value: 7,
                        message: "Min length is 7 symbols",
                    },
                    pattern: {
                        value: /\d+/g,
                        message: "Password must have one number",
                    },
                })}
                InputProps={{
                    endAdornment: (
                        <Adornment
                            showPassword={showPassword}
                            onClick={handleClickShowPassword}
                        />
                    ),
                    type: showPassword ? "text" : "password",
                }}
            />
            <TextField
                error={!!errors.email || !!authError}
                helperText={
                    errors.email ? errors.email.message : authError || null
                }
                id="email"
                label="Email"
                placeholder="abc@box.com"
                variant="standard"
                margin="normal"
                {...register("email", {
                    required: {
                        value: true,
                        message: "Field is required",
                    },
                    pattern: {
                        value: /^\S+@\S+\.\S+$/i,
                        message: "Email is incorrect. Example abc@abc.com",
                    },
                })}
            />
            <SignInButton forSignIn={false} />
            <LinkToForm forSignIn={false} toggleForm={toggleForm} />
        </Box>
    );
};
export default RegisterForm;
