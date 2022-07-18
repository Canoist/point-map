import { Box, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getAuthErrors, logIn } from "../store/user";
import sxForm from "../styles/sxForm";
import ILogin from "../types/ILogin";
import Adornment from "./adornment";
import LinkToForm from "./linkToForm";
import SignInButton from "./signInButton";
import TitleForm from "./titleForm";

const defaultValues = {
    email: "",
    password: "",
    stayOn: false
};

export type FiledValues = typeof defaultValues;
type LocationProps = {
    state: {
        from: Location;
    };
};

const SignInForm: React.FC<ILogin> = ({ toggleForm }) => {
    const location = useLocation() as unknown as LocationProps;
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [error, setError] = useState<null | any>(null);
    const [data, setData] = useState<FiledValues>(defaultValues);
    const dispatch = useAppDispatch();
    const loginError = useAppSelector(getAuthErrors());

    let from = location.state?.from?.pathname || "/";

    const handleChange = ({ target }: any) => {
        setData((prev) => ({ ...prev, [target.id]: target.value }));
        setError(null);
    };

    useEffect(() => {
        setError(loginError);
    }, [loginError]);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        await dispatch(
            logIn(
                {
                    payload: data,
                    redirect: from
                },
                navigate
            )
        );
    };

    return (
        <Box component="form" sx={sxForm} onSubmit={handleSubmit}>
            <TitleForm />
            <p>ax@mail.ru</p>
            <p>1234ABC</p>
            <TextField
                error={!!error}
                helperText={error || null}
                id="email"
                label="Email"
                placeholder="Youre email"
                variant="standard"
                margin="normal"
                onChange={handleChange}
            />
            <TextField
                error={!!error}
                helperText={error || null}
                id="password"
                label="Password"
                variant="standard"
                margin="normal"
                onChange={handleChange}
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
            <SignInButton forSignIn={true} />
            <LinkToForm forSignIn={true} toggleForm={toggleForm} />
        </Box>
    );
};
export default SignInForm;
