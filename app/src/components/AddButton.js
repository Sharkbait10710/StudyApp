import * as React   from 'react';
import AddIcon      from '@mui/icons-material/Add'
import {IconButton} from '@mui/material';

class AddButton extends React.Component {
    render() {
        return (
            <IconButton
                onClick={() => {
                    this.props.setFunction(true);
                }}
                sx = {{
                    border: 1,
                    transform: "scale(1.7)",
                    ml: "17%",
                    mr: this.props.cond ? "auto" : "50%"
                }}>
                <AddIcon/>
            </IconButton>
        )
    }
}

export default AddButton;