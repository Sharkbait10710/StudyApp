import * as React from 'react';
import ArrowBackIosNewIcon  from '@mui/icons-material/ArrowBackIosNew'
import {IconButton} from '@mui/material';

class AccessButton extends React.Component {
    render() {
        return (
            <IconButton
                onClick={() => {
                    this.props.runFunction()
                }}
                sx = {{
                    border: 1,
                    transform: "scale(1.7)"
                }}>
                <ArrowBackIosNewIcon/>
            </IconButton>
        )
    }
}

export default AccessButton;