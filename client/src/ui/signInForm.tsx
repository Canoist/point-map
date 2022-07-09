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
import { useLocation, useNavigate } from "react-router-dom";

const defaultValues = {
    email: "",
    password: "",
    stayOn: false,
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

    // 1234ABC
    // a@MAIL.RU

    const handleSubmit = (e: any) => {
        e.preventDefault();

        const from = location.state?.from?.pathname || "/";
        dispatch(
            logIn({
                payload: data,
                redirect: from,
            })
        ).then(() => {
            navigate(from, { replace: true });
        });
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
                    type: showPassword ? "text" : "password",
                }}
            />
            <SignInButton forSignIn={true} />
            <LinkToForm forSignIn={true} toggleForm={toggleForm} />
        </Box>
    );
};
export default SignInForm;
