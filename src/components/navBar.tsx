import { Box, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import Map from "../pages/map";
import PointAdd from "../pages/pointAdd";
import PointList from "../pages/pointList";
import { a11yProps } from "../utils/allyProps";
import TabPanel from "./tabPanel";

const NavBar: React.FC = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example">
          <Tab label="Map" {...a11yProps(0)} />
          <Tab label="Add Point" {...a11yProps(1)} />
          <Tab label="Points list" {...a11yProps(2)} />
        </Tabs>
      </Box>
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
