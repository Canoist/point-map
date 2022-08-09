import React, { useState } from "react";
import { styled, SxProps } from "@mui/material/styles";
import Rating, { IconContainerProps } from "@mui/material/Rating";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import { Box, Typography } from "@mui/material";
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
        icon: <SentimentVeryDissatisfiedIcon fontSize="large" color="error" />,
        label: "Terrible",
    },
    2: {
        icon: <SentimentDissatisfiedIcon fontSize="large" color="error" />,
        label: "Bad",
    },
    3: {
        icon: <SentimentSatisfiedIcon fontSize="large" color="warning" />,
        label: "Normal",
    },
    4: {
        icon: <SentimentSatisfiedAltIcon fontSize="large" color="success" />,
        label: "Good",
    },
    5: {
        icon: <SentimentVerySatisfiedIcon fontSize="large" color="success" />,
        label: "Perfect",
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

    const handleChange = (newValue: number | null) => {
        setValue(newValue);

        if (newValue !== null) {
            onChange({
                ...data,
                properties: {
                    ...data.properties,
                    court: customIcons[newValue!].label,
                },
            });
        }
    };

    return (
        <Box
            sx={{
                width: 300,
                display: "flex",
                alignItems: "center",
                height: 40,
                ...sx,
            }}
        >
            <StyledRating
                name="highlight-selected-only"
                defaultValue={3}
                IconContainerComponent={IconContainer}
                getLabelText={(value: number) => customIcons[value].label}
                highlightSelectedOnly
                precision={1}
                onChange={(event, newValue) => {
                    handleChange(newValue);
                }}
                sx={{ heigth: 80 }}
            />
            {value !== null ? (
                <Typography sx={{ ml: 2 }}>
                    {customIcons[value].label}
                </Typography>
            ) : (
                <Typography sx={{ ml: 2 }}>
                    Please, choose a condition
                </Typography>
            )}
        </Box>
    );
};

export default RadioGroupRating;
