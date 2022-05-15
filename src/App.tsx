import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/navBar";

const initialData: any = [
  {
    type: "Feature",
    properties: {
      ID: "60.6788189882135130.00185121217478",
      NAME: "База рафтинга Кивиниеми",
      DESCRIPTIO: "Основную часть кода писал здесь",
    },
    geometry: {
      type: "Point",
      coordinates: [60.67881898821351, 30.00185121217478],
    },
  },
  {
    type: "Feature",
    properties: {
      ID: "60.4475909774236330.28923155946069",
      NAME: "Фигурное озеро",
      DESCRIPTIO:
        "Был судьей на соревнованиях по рафингу на этом озере 14-15 мая",
    },
    geometry: {
      type: "Point",
      coordinates: [60.44759097742363, 30.28923155946069],
    },
  },
];

const App: React.FC = (): JSX.Element => {
  const [pointList, setPointList] = useState<any>(initialData);

  const handleSubmit = (incomingData: any) => {
    console.log(incomingData);
    setPointList((prev: any) => prev);
    //   (prev) => prev.push(incomingData)
    // localStorage.setItem("geoData", JSON.stringify(pointList));
  };

  const handleDelete = (id: any) => {
    const newList: any = pointList.filter(
      (item: any) => item.properties.ID !== id
    );
    console.log(newList);
  };

  return (
    <>
      <Routes>
        <Route
          path="*"
          element={
            <NavBar
              points={pointList}
              onSubmit={handleSubmit}
              onDelete={handleDelete}
            />
          }
        />
      </Routes>
    </>
  );
};

export default App;
