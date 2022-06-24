import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getPointsLoadingStatus, loadPoints } from "../../store/points";
import { getIsLoggedIn } from "../../store/user";
import WindowLoader from "../windowLoader";

interface IAppLoader {
    children: any;
}

const AppLoader: React.FC<IAppLoader> = ({ children }) => {
    const dispatch = useAppDispatch();
    const isLoggedIn = useAppSelector(getIsLoggedIn());
    // const userStatusLoading = useAppSelector(getUsersLoadingStatus());
    const isLoaded = useAppSelector(getPointsLoadingStatus());

    useEffect(() => {
        if (isLoggedIn) {
            dispatch(loadPoints());
            console.log("LoadUserList");

            // dispatch(loadUsersList())
        }
    }, [dispatch, isLoggedIn]);
    // if (!userStatusLoading) return <WindowLoader />;
    if (isLoaded) return <WindowLoader />;

    return children;
};
export default AppLoader;
