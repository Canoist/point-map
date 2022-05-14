import { Box } from "@mui/material";
import React, { useState } from "react";
import Map from "../pages/map";
import PointAdd from "../pages/pointAdd";
import PointList from "../pages/pointList";
import TabPanel from "./tabPanel";
import TabsBox from "./tabsBox";

const NavBar: React.FC = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <TabsBox value={value} onChange={handleChange} />
      <TabPanel value={value} index={0}>
        <Map />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <PointAdd />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <PointList />
      </TabPanel>
    </Box>
  );
};
export default NavBar;
