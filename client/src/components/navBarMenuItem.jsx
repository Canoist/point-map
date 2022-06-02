import React from "react";
import PropTypes from "prop-types";
import { ListItemIcon, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import Logout from "@mui/icons-material/Logout";
import Settings from "@mui/icons-material/Settings";
import { translateTab } from "../utils/translateTab";

const NavBarMenuItem = ({ onClick, setting }) => {
    return (
        <MenuItem
            onClick={onClick}
            sx={{
                px: "15px",
            }}>
            <ListItemIcon>
                {setting === "Logout" ? (
                    <Logout fontSize="small" />
                ) : (
                    <Settings fontSize="small" />
                )}
            </ListItemIcon>
            <Link
                style={{
                    textDecoration: "none",
                    color: "black",
                    textAlign: "center",
                }}
                to={`/${setting.toLowerCase()}`}>
                {translateTab(setting)}
            </Link>
        </MenuItem>
    );
};

NavBarMenuItem.propTypes = {
    onClick: PropTypes.func,
    setting: PropTypes.string,
};

export default NavBarMenuItem;
