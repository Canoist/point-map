import { Button } from "@mui/material";
import React from "react";

interface ISignInButton {
    forSignIn: boolean;
}

const SignInButton: React.FC<ISignInButton> = ({ forSignIn }) => {
    return (
        <Button
            variant="contained"
            type="submit"
            color="warning"
            sx={{
                my: 2,
            }}>
            {forSignIn ? "Войти" : "Зарегистрироваться"}
        </Button>
    );
};

export default SignInButton;
