import React from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import Styles from "../types/styles";
import { translateTab } from "../utils/translateTab";

interface INavBarButton {
    page: string;
    onClickCloseMenu?: React.MouseEventHandler;
    otherStyles?: Styles;
}

const NavBarButton: React.FC<INavBarButton> = ({
    page,
    onClickCloseMenu,
    otherStyles,
}) => {
    return (
        <Button
            sx={{
                borderRadius: 0,
                color: "white",
                display: "block",
                ...otherStyles,
            }}>
            <Link
                onClick={onClickCloseMenu}
                style={{
                    textDecoration: "none",
                    color: "white",
                    width: "100%",
                }}
                to={`/${page !== "Main" ? page.toLowerCase() : ""}`}>
                <div
                    style={{
                        width: "100%",
                        height: "100%",
                        padding: "1rem 0",
                    }}>
                    {translateTab(page)}
                </div>
            </Link>
        </Button>
    );
};

export default NavBarButton;
