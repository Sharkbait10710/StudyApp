import * as React   from 'react';
import CreateIcon   from '@mui/icons-material/Create'
import {IconButton} from '@mui/material'

import { motion } from 'framer-motion'

class EditButton extends React.Component {
    render() {
        return (
            <motion.div
                whileHover={{
                    scale: 1.1
                }}>
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
            </motion.div>
        )
    }
}

export default EditButton;