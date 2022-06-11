import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/navBar/navBar";
import Login from "./layouts/login";
import Main from "./layouts/main";
import OwnPoints from "./layouts/ownPoints";
import points from "./mock/points";
import IPoint from "./types/IPoint";

const App: React.FC = (): JSX.Element => {
    const [pointsList, setPointsList] = useState<IPoint[] | []>(points);

    //   const handleSubmit = (incomingData: any) => {
    //     setPointList((prev: any) => [...prev, incomingData]);
    //     console.log(incomingData);
    //   };

    const handleDelete = (id: string) => {
        const newList: any = pointsList.filter(
            (item: any) => item.properties._id !== id
        );
        setPointsList(newList);
    };

    return (
        <>
            <NavBar />
            <Routes>
                <Route
                    path="ownPoints"
                    element={
                        <OwnPoints
                            points={pointsList}
                            onDelete={handleDelete}
                        />
                    }
                />
                <Route path="login" element={<Login />} />
                <Route
                    path="*"
                    element={
                        <Main points={pointsList} />
                        //   onSubmit={handleSubmit}
                    }
                />
            </Routes>
        </>
    );
};

export default App;
