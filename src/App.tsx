import React from "react";
import { Navigate, useRoutes } from "react-router-dom";
import Map from "./pages/map";
import PointAdd from "./pages/pointAdd";
import PointList from "./pages/pointList";

const App: React.FC = (): JSX.Element => {
  const mainRoutes = {
    path: "/",
    element: <Map />,
    children: [
      { path: "*", element: <Navigate to="/" /> },
      { path: "addPoint", element: <PointAdd /> },
      { path: "pointList", element: <PointList /> },
    ],
  };
  const routing = useRoutes([mainRoutes]);
  return <>{routing}</>;
};

export default App;
