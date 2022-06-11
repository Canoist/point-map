import React from "react";
import Map from "../pages/map";

interface MapProps {
    points?: any;
}
const Main: React.FC<MapProps> = ({ points }) => {
    return <Map points={points} />;
};
export default Main;
