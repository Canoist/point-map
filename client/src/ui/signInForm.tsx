import { Box, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import LinkToForm from "./linkToForm";
import TitleForm from "./titleForm";
import Adornment from "./adornment";
import SignInButton from "./signInButton";
import sxForm from "../styles/sxForm";
import { getAuthErrors, logIn } from "../store/user";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import ILogin from "../types/ILogin";
// import { useHistory } from "react-router-dom";

const defaultValues = {
    email: "",
    password: "",
    stayOn: false,
};

export type FiledValues = typeof defaultValues;

const SignInForm: React.FC<ILogin> = ({ toggleForm }) => {
    // const history = useHistory();
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [error, setError] = useState<null | any>(null);
    const [data, setData] = useState<FiledValues>(defaultValues);
    const dispatch = useAppDispatch();
    const loginError = useAppSelector(getAuthErrors());

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

    const handleSubmit = (e: any) => {
        e.preventDefault();
        // const redirect = history.location.state
        //     ? history.location.state.from.pathname
        //     : "/";
        dispatch(
            logIn({
                payload: data,
                // redirect
            })
        );
    };

    return (
        <Box component="form" sx={sxForm} onSubmit={handleSubmit}>
            <TitleForm />
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
                    type: showPassword ? "text" : "password",
                }}
            />
            <SignInButton forSignIn={true} />
            <LinkToForm forSignIn={true} toggleForm={toggleForm} />
        </Box>
    );
};
export default SignInForm;
