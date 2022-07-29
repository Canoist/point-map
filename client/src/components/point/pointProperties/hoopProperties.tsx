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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 300,
        },
    },
};

const propertiesList = [
    "Two hoops",
    "One hoop",
    "Heigth: Standart",
    "Heigth: Non-standart (higher)",
    "Heigth: Non-standart (lower)",
    "Net: Classic",
    "Net: Chain",
    "Net: None",
    "Net: Classic/None",
    "Net: Chain/None",
    "Net: Chain/Classic",
    "Backboard-material: Wooden",
    "Backboard-material: Polycarbonate",
    "Backboard-material: Acrylic",
    "Backboard-material: Tempered Glass",
    "Backboard-material: Standart size",
    "Backboard-material: Non-standart size",
    "Crooked Hoop",
];

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
        <FormControl sx={{ width: 350 }}>
            <InputLabel id="hoop-chip-label">Hoop properties</InputLabel>
            <Select
                labelId="hoop-chip-label"
                id="multiple-chip"
                multiple
                value={hoopProperties}
                onChange={handleChange}
                input={
                    <OutlinedInput
                        id="select-multiple-chip"
                        label="Hoop properties"
                    />
                }
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
