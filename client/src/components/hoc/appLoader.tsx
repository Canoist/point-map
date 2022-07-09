import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getPointsLoadingStatus, loadPoints } from "../../store/points";
import { getIsLoggedIn, getUsersLoadingStatus } from "../../store/user";
import WindowLoader from "../windowLoader";

interface IAppLoader {
    children: any;
}

const AppLoader: React.FC<IAppLoader> = ({ children }) => {
    const dispatch = useAppDispatch();
    const isLoggedIn = useAppSelector(getIsLoggedIn());
    const isLoadPoints = useAppSelector(getPointsLoadingStatus());
    const isLoadUser = useAppSelector(getUsersLoadingStatus());

    const isLoad = isLoadPoints && isLoadUser;

    useEffect(() => {
        dispatch(loadPoints());
        if (isLoggedIn) {
            console.log("Here will be LoadUserList");

            // dispatch(loadUsersList())
        }
    }, [dispatch, isLoggedIn]);
    if (isLoad) return <WindowLoader />;

    return children;
};
export default AppLoader;
