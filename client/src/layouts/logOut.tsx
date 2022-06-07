import { CircularProgress } from "@mui/material";
import React, { useEffect } from "react";
import { useAppDispatch } from "../store/hooks";
import { logOut } from "../store/user";

const LogOut: React.FC = () => {
    const dispatch = useAppDispatch;

    useEffect(() => {
        dispatch(logOut());
    }, [dispatch]);

    return <CircularProgress />;
};

export default LogOut;
