import React from 'react';
import { teal } from '@mui/material/colors';
import Checkbox from '@mui/material/Checkbox';
import CustomizedTypoSmall from './CustomizedTypoSmall';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { handle } from 'express/lib/application';

export default function FeedbackRate({question}) {
    const [checked, setChecked] = React.useState(0);
    const rateOrder = [1, 2, 3, 4, 5];
    const handleRate = (order) => {
        if (checked === 0 || (checked !== 0 && checked !== order)) {
            setChecked(order);
        }
        else if (checked === order) {
            setChecked(0);
        }
        console.log(checked);
    }

    return(
        <div>
            <CustomizedTypoSmall> {question} </CustomizedTypoSmall>
            {rateOrder.map((order) => {
                return(
                    <FormControlLabel
                        key={order}
                        control={
                            <Checkbox 
                                onChange={() => handleRate(order)}
                                icon={<CircleOutlinedIcon />}
                                checkedIcon={<CheckCircleIcon />}
                                sx={{
                                    '&.Mui-checked': {
                                        color: teal[700],
                                    }
                                }}
                            />
                        }
                        label={order}
                        labelPlacement="bottom"
                    />
                )
            })}
        </div>
    )
}