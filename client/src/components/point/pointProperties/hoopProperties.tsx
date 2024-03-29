import React, { useEffect, useState } from "react";
import { Theme, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { Checkbox, ListItemText } from "@mui/material";
import IPoint from "../../../types/IPoint";
import propertiesList from "./propertiesList";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        sx: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: { xs: 200, sm: 300 },
        },
    },
};

function getStyles(
    name: string,
    hoopProperties: readonly string[],
    theme: Theme
) {
    return {
        fontWeight:
            hoopProperties.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

interface IHoopProperties {
    onChange: any;
    data: IPoint;
}

const HoopProperties: React.FC<IHoopProperties> = ({ onChange, data }) => {
    const theme = useTheme();
    const [hoopProperties, setHoopProperties] = useState<string[]>([]);

    const handleChange = (event: SelectChangeEvent<typeof hoopProperties>) => {
        const {
            target: { value },
        } = event;
        setHoopProperties(() =>
            typeof value === "string" ? value.split(",") : value
        );
    };

    useEffect(() => {
        onChange({
            ...data,
            properties: { ...data.properties, hoop: hoopProperties },
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hoopProperties]);

    return (
        <FormControl
            sx={{
                width: { xs: 250, sm: 350 },
            }}
        >
            <InputLabel id="hoop-chip-label">Hoop properties</InputLabel>
            <Select
                labelId="hoop-chip-label"
                id="multiple-chip"
                multiple
                value={hoopProperties}
                onChange={handleChange}
                input={<OutlinedInput label="Hoop properties" />}
                renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {selected.map((value) => (
                            <Chip key={value} label={value} />
                        ))}
                    </Box>
                )}
                MenuProps={MenuProps}
            >
                {propertiesList.map((property) => (
                    <MenuItem
                        key={property}
                        value={property}
                        style={getStyles(property, hoopProperties, theme)}
                    >
                        <Checkbox
                            checked={hoopProperties.indexOf(property) > -1}
                        />
                        <ListItemText primary={property} />
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default HoopProperties;
