import * as React   from 'react';
import { Grid }     from '@mui/material';
import { motion }   from 'framer-motion'
class Item extends React.Component {
    render() {
        return (
            <Grid
                item
                sx = {{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',

                    fontFamily: 'Space Grotesk',
                    color: 'black',
                    textAlign: 'center',
                    fontSize: '20px',

                    width: '75%',
                    
                    overflow: "hidden"
                
                }}>
                    <motion.div
                        whileHover={{
                            scale: 1.1
                        }}  
                        onClick={
                            () => this.props.runFunction()
                        }
                        className="multipleChoice"
                        style={{
                            fontWeight: '700',

                            overFlowX: "hidden",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                            display: "block",
                            overflow: "hidden"
                        }}>
                        {this.props.text}
                    </motion.div>
            </Grid>
        );
    }
}

export default Item;