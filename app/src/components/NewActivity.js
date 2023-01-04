import * as React from 'react';
import { 
    Grid,
    Input, 
    IconButton,
} from '@mui/material';

class NewActivity extends React.Component {
    render() {
        return (
            <Grid
                container
                sx={{
                    zIndex: 1,

                    textAlign: 'center',

                    position: 'absolute',
                    left: "20%",
                    top: "35%",

                    height: "15vh",
                    width: "60%",

                    border: 3,
                    borderColor: '#e0dbce',
                    borderRadius: '15px'
                }}>
                    <Grid
                        item
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            
                            boxShadow: "0 0 0 max(100vh, 100vw) rgba(0, 0, 0, .6)",
                            
                            width: "100%",
                            height: "100%",
                            textAlign: "center",

                            bgcolor: "white",
                            borderRadius: '15px'
                        }}>
                            <Input 
                                id="UserInput"
                                ref={this.props.inputRef}
                                inputProps= {{
                                    style: { textAlign: 'center' }
                                }}
                                sx={{
                                    fontSize: "66px",

                                    border: 1,
                                    borderColor: 'green'
                                }}/>
                    </Grid>
                            
            </Grid>
        )
    }
}

export default NewActivity;