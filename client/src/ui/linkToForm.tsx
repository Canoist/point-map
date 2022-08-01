import React, { MouseEventHandler } from "react";
import { Link, Typography } from "@mui/material";

interface ILinkToForm {
    forSignIn: Boolean;
    toggleForm: MouseEventHandler;
}

const LinkToForm: React.FC<ILinkToForm> = ({ forSignIn, toggleForm }) => {
    return (
        <Typography
            align="center"
            style={{
                fontWeight: "normal",
                color: "#23252E",
            }}
            component="p"
        >
            {forSignIn ? "Not with us?" : "Do you have a account?"}{" "}
            <Link
                variant="button"
                underline="always"
                onClick={toggleForm}
                style={{
                    fontWeight: "normal",
                    cursor: "pointer",
                    color: "#23252E",
                }}
            >
                {" "}
                {forSignIn ? "Sign in" : "Log in"}
            </Link>
        </Typography>
    );
};

export default LinkToForm;
