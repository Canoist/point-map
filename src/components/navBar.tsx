import { Box } from "@mui/material";
import React, { useState } from "react";
import Map from "../pages/map";
import PointAdd from "../pages/pointAdd";
import PointList from "../pages/pointList";
import TabPanel from "./tabPanel";
import TabsBox from "./tabsBox";

interface NavBarProps {
  points: any;
  onSubmit: any;
  onDelete: any;
}

const NavBar: React.FC<NavBarProps> = (props: NavBarProps) => {
  const [value, setValue] = useState(0);
  const { points, onSubmit, onDelete } = props;

  //   console.log(points);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <TabsBox value={value} onChange={handleChange} />
      <TabPanel value={value} index={0}>
        <span>
          <Map points={points} />
        </span>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <span>
          <PointAdd onSubmit={onSubmit} />
        </span>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <span>
          <PointList points={points} onDelete={onDelete} />
        </span>
      </TabPanel>
    </Box>
  );
};
export default NavBar;
