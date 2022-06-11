import React from "react";
import { Route, Routes } from "react-router-dom";
import AppLoader from "./components/hoc/appLoader";
import NavBar from "./components/navBar/navBar";
import Login from "./layouts/login";
import Main from "./layouts/main";
import OwnPoints from "./layouts/ownPoints";

const App: React.FC = (): JSX.Element => {
    //   const handleSubmit = (incomingData: any) => {
    //     setPointList((prev: any) => [...prev, incomingData]);
    //     console.log(incomingData);
    //   };

    return (
        <AppLoader>
            <NavBar />
            <Routes>
                <Route path="ownPoints" element={<OwnPoints />} />
                <Route path="login" element={<Login />} />
                <Route
                    path="*"
                    element={
                        <Main />
                        //   onSubmit={handleSubmit}
                    }
                />
            </Routes>
        </AppLoader>
    );
};

export default App;
