import React, { useState } from "react";
import { styled, SxProps } from "@mui/material/styles";
import Rating, { IconContainerProps } from "@mui/material/Rating";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import { Box } from "@mui/material";
import { Theme } from "@mui/system";
import IPoint from "../types/IPoint";

const StyledRating = styled(Rating)(({ theme }) => ({
    "& .MuiRating-iconEmpty .MuiSvgIcon-root": {
        color: theme.palette.action.disabled,
    },
}));

const customIcons: {
    [index: string]: {
        icon: React.ReactElement;
        label: string;
    };
} = {
    1: {
        icon: <SentimentVeryDissatisfiedIcon color="error" />,
        label: "Very Dissatisfied",
    },
    2: {
        icon: <SentimentDissatisfiedIcon color="error" />,
        label: "Dissatisfied",
    },
    3: {
        icon: <SentimentSatisfiedIcon color="warning" />,
        label: "Neutral",
    },
    4: {
        icon: <SentimentSatisfiedAltIcon color="success" />,
        label: "Satisfied",
    },
    5: {
        icon: <SentimentVerySatisfiedIcon color="success" />,
        label: "Very Satisfied",
    },
};

const IconContainer: React.FC<IconContainerProps> = (props) => {
    const { value, ...other } = props;
    return <span {...other}>{customIcons[value].icon}</span>;
};

interface IRadioGroupRating {
    sx?: SxProps<Theme>;
    onChange: any;
    data: IPoint;
}

const RadioGroupRating: React.FC<IRadioGroupRating> = ({
    sx,
    onChange,
    data,
}) => {
    const [value, setValue] = useState<number | null>(3);

    const handleChange = () => {
        onChange({
            ...data,
            properties: {
                ...data.properties,
                court: customIcons[value!].label,
            },
        });
    };

    return (
        <Box
            sx={{
                width: 270,
                display: "flex",
                alignItems: "center",
                ...sx,
            }}
        >
            <StyledRating
                name="highlight-selected-only"
                defaultValue={3}
                IconContainerComponent={IconContainer}
                getLabelText={(value: number) => customIcons[value].label}
                highlightSelectedOnly
                onChange={(event, newValue) => {
                    setValue(newValue);
                    handleChange();
                }}
                sx={{ heigth: 80 }}
            />
            {value !== null && (
                <Box sx={{ ml: 2 }}>{customIcons[value].label}</Box>
            )}
        </Box>
    );
};

export default RadioGroupRating;
