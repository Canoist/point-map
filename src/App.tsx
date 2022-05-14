import React from "react";
import { Navigate, useRoutes } from "react-router-dom";
import NavBar from "./components/navBar";
import Map from "./pages/map";

const App: React.FC = (): JSX.Element => {
  const mainRoutes = {
    path: "/",
    element: <Map />,
    children: [{ path: "*", element: <Navigate to="/" /> }],
  };
  const routing = useRoutes([mainRoutes]);
  return (
    <>
      <NavBar />
      {routing}
    </>
  );
};

export default App;
