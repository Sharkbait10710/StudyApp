import * as React from 'react';
import ArrowBackIosNewIcon  from '@mui/icons-material/ArrowBackIosNew'
import {IconButton} from '@mui/material';

class EditButton extends React.Component {
    render() {
        return (
            <IconButton
                onClick={() => {
                    this.props.runFunction();
                }} sx={{
                    width:"3wh",
                    height:"4vh",

                    border: 1,
                    borderColor: "#e0dbce",
                    borderRadius: "15px",

                    ml: "5px",
                    mr: "5px"
                }}>
                <CreateIcon/>
            </IconButton>
        )
    }
}