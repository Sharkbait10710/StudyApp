import * as React   from 'react';
import RemoveIcon   from '@mui/icons-material/Remove'
import {IconButton} from '@mui/material';

class RemoveButton extends React.Component {
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
                <RemoveIcon/>
            </IconButton>
        )
    }
}

export default RemoveButton;