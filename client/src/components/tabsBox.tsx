import { Box, Tab, Tabs } from "@mui/material";
import React from "react";
import { a11yProps } from "../utils/allyProps";

interface TabsBoxProps {
  value: number;
  onChange: any;
}
const TabsBox: React.FC<TabsBoxProps> = (props: TabsBoxProps) => {
  const { value, onChange } = props;
  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
      <Tabs value={value} onChange={onChange} aria-label="basic tabs example">
        <Tab label="Map" {...a11yProps(0)} />
        <Tab label="Add Point" {...a11yProps(1)} />
        <Tab label="Points list" {...a11yProps(2)} />
      </Tabs>
    </Box>
  );
};
export default TabsBox;
