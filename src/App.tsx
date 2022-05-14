import React from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/navBar";

const App: React.FC = (): JSX.Element => {
  return (
    <>
      <Routes>
        <Route path="*" element={<NavBar />} />
      </Routes>
    </>
  );
};

export default App;
