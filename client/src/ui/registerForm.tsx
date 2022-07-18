import { Box, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
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

const RegisterForm: React.FC<ILogin> = ({ toggleForm }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [authError, setAuthError] = useState<any>(null);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const loginError = useAppSelector(getAuthErrors());
    useEffect(() => {
        setAuthError(loginError);
    }, [loginError]);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const onSubmit = (data: any) => {
        const newData = { ...data, points: [] };
        console.log(newData);
        dispatch(signUp(data)).then(() => {
            if (!authError) {
                navigate("/", { replace: true });
            }
        });
    };
    return (
        <Box component="form" sx={sxForm} onSubmit={handleSubmit(onSubmit)}>
            <TitleForm />
            <TextFirstname error={errors.firstname} register={register} />
            <TextLastname error={errors.lastname} register={register} />
            <TextField
                error={!!errors.password}
                helperText={errors.password ? errors.password.message : null}
                id="password"
                label="Пароль"
                variant="standard"
                margin="normal"
                {...register("password", {
                    required: {
                        value: true,
                        message: "Поле обязательно для заполнения"
                    },
                    minLength: {
                        value: 7,
                        message: "Минимальная длина пароля 7 символов"
                    },
                    pattern: {
                        value: /\d+/g,
                        message: "Необходимо наличие хотя бы одной цифры"
                    }
                })}
                InputProps={{
                    endAdornment: (
                        <Adornment
                            showPassword={showPassword}
                            onClick={handleClickShowPassword}
                        />
                    ),
                    type: showPassword ? "text" : "password"
                }}
            />
            <TextField
                error={!!errors.email || !!authError}
                helperText={
                    errors.email ? errors.email.message : authError || null
                }
                id="email"
                label="Электронная почта"
                placeholder="abc@box.com"
                variant="standard"
                margin="normal"
                {...register("email", {
                    required: {
                        value: true,
                        message: "Поле обязательно для заполнения"
                    },
                    pattern: {
                        value: /^\S+@\S+\.\S+$/i,
                        message: "Email введен некорректно. Шаблон abc@abc.com"
                    }
                })}
            />
            <SignInButton forSignIn={false} />
            {authError && <p>loginError.message</p>}
            <LinkToForm forSignIn={false} toggleForm={toggleForm} />
        </Box>
    );
};
export default RegisterForm;
