import * as React   from 'react';
import AddIcon      from '@mui/icons-material/Add'
import {IconButton} from '@mui/material'

import { motion  }          from 'framer-motion'
class AddButton extends React.Component {
    render() {
        return (
            <motion.div
                whileHover={{
                    scale: 1.2
              }}>
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
            </motion.div>
        )
    }
}

export default AddButton;