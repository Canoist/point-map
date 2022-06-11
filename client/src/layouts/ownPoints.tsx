import React from "react";
import PointListPage from "../pages/pointListPage";
import IPoint from "../types/IPoint";

interface IOwnPoints {
    points: IPoint[] | [];
    onDelete: any;
}

const OwnPoints: React.FC<IOwnPoints> = ({ onDelete, points }) => {
    // const [pointList, setPointList] = useState<IPoint[] | []>(points);

    // const handleDelete = (id: string) => {
    //     console.log(id);

    //     const newList: IPoint[] = pointList.filter(
    //         (item: IPoint) => item.properties._id !== id
    //     );
    //     setPointList(newList);
    // };
    return <PointListPage points={points} onDelete={onDelete} />;
};
export default OwnPoints;
