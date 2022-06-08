import React, { MouseEventHandler } from "react";
import { Link } from "@mui/material";

interface ILinkToForm {
    forSignIn: Boolean;
    toggleForm: MouseEventHandler;
}

const LinkToForm: React.FC<ILinkToForm> = ({ forSignIn, toggleForm }) => {
    return (
        <p
            style={{
                fontWeight: "normal",
                color: "#23252E",
            }}>
            {forSignIn ? "Еще не с нами?" : "Уже есть аккаунт?"}{" "}
            <Link
                variant="button"
                underline="always"
                onClick={toggleForm}
                style={{
                    fontWeight: "normal",
                    cursor: "pointer",
                    color: "#23252E",
                }}>
                {" "}
                {forSignIn ? "Присоединиться" : "Войти"}
            </Link>
        </p>
    );
};

export default LinkToForm;
