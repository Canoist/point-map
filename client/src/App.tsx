import React from "react";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/footer";
import AppLoader from "./components/hoc/appLoader";
import NavBar from "./components/navBar/navBar";
import Login from "./layouts/login";
import LogOut from "./layouts/logOut";
import Main from "./layouts/main";
import OwnPoints from "./layouts/ownPoints";

const App: React.FC = (): JSX.Element => {
    return (
        <AppLoader>
            <NavBar />
            <Routes>
                <Route path="ownPoints" element={<OwnPoints />} />
                <Route path="login" element={<Login />} />
                <Route path="/?lat?lng" element={<Main />} />
                <Route path="logout" element={<LogOut />} />
                <Route path="*" element={<Main />} />
            </Routes>
            <Footer />
        </AppLoader>
    );
};

export default App;
