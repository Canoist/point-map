import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { getDataStatus } from "../../store/user";

interface IProtectedRoutes {
    children: JSX.Element;
}
const ProtectedRoutes: React.FC<IProtectedRoutes> = ({ children }) => {
    const isLoggedIn = useAppSelector(getDataStatus());
    const location = useLocation()

    if (!isLoggedIn) {return <Navigate to="/login" state={{ from: location }} replace />}
    
    return children;
};
export default ProtectedRoutes;
