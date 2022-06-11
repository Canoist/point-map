import React, { useState } from "react";
import points from "../mock/points";
import PointListPage from "../pages/pointListPage";
import IPoint from "../types/IPoint";

const OwnPoints: React.FC = () => {
    const [pointList, setPointList] = useState<IPoint[] | []>(points);

    const handleDelete = (id: string) => {
        console.log(id);

        const newList: IPoint[] = pointList.filter(
            (item: IPoint) => item.properties._id !== id
        );
        setPointList(newList);
    };
    return <PointListPage points={pointList} onDelete={handleDelete} />;
};
export default OwnPoints;
