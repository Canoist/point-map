import { CircularProgress } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store/hooks";
import { logOut } from "../store/user";

const LogOut: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(logOut(navigate("/", { replace: true })));
    }, [dispatch, navigate]);

    return <CircularProgress />;
};

export default LogOut;
