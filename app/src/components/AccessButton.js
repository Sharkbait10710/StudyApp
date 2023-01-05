import * as React           from 'react';
import ArrowBackIosNewIcon  from '@mui/icons-material/ArrowBackIosNew'
import { IconButton }       from '@mui/material';

import { motion  }          from 'framer-motion'
class AccessButton extends React.Component {
    render() {
        return (
            <motion.div
                whileHover={{
                    scale: 1.2
              }}>
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
            </motion.div>
        )
    }
}

export default AccessButton;