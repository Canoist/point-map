import React from "react";
import PointListPage from "../pages/pointListPage";

const OwnPoints: React.FC= () => {
    // const [pointList, setPointList] = useState<IPoint[] | []>(points);

    // const handleDelete = (id: string) => {
    //     console.log(id);

    //     const newList: IPoint[] = pointList.filter(
    //         (item: IPoint) => item.properties._id !== id
    //     );
    //     setPointList(newList);
    // };
    return <PointListPage />;
};
export default OwnPoints;
