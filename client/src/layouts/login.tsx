import { Box } from "@mui/material";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../store/hooks";
import { resetAuthErrors } from "../store/user";
import RegisterForm from "../ui/registerForm";
import SignInForm from "../ui/signInForm";

const Login = () => {
    const { type } = useParams();
    const dispatch = useAppDispatch();
    const [formType, setFormType] = useState<string>(
        type === "register" ? type : "login"
    );
    const toggleFormType = () => {
        setFormType((prev) => (prev === "register" ? "login" : "register"));
        dispatch(resetAuthErrors());
    };

    return (
        <Box
            sx={{
                minHeight: "80vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                "&::-webkit-scrollbar": {
                    width: "18px",
                },
            }}>
            {formType === "register" ? (
                <>
                    <Box sx={{ pb: { xs: "100px", md: "70px" } }}>
                        <RegisterForm toggleForm={toggleFormType} />
                    </Box>
                </>
            ) : (
                <>
                    <SignInForm toggleForm={toggleFormType} />
                </>
            )}
        </Box>
    );
};
export default Login;
