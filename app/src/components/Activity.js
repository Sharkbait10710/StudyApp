import * as React from 'react';
import { 
    Grid,
    FormControl,
    InputLabel,
    OutlinedInput
} from '@mui/material';

class Activity extends React.Component {
    render() {
        return (
            <Grid
                container
                sx={{
                    zIndex: 1,

                    bgColor: 'red',
                    textAlign: 'center',

                    position: 'absolute',
                    left: "10%",
                    top: "5%",

                    height: "90vh",
                    width: "80%",

                    border: 3,
                    borderColor: '#e0dbce',
                    borderRadius: '15px'
                }}>
                <Grid
                    item
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        boxShadow: "0 0 0 max(100vh, 100vw) rgba(0, 0, 0, .1)",
                        
                        width: "100%",
                        height: "100%",
                        textAlign: "center",

                        bgcolor: "white",

                        borderRadius: '15px'
                    }}>
                        <Grid
                            item
                            sx={{
                                display: 'flex',
                                flexGrow: 1,

                                fontFamily: 'Space Grotesk',
                                overflowWrap: 'break-word',
                                overflow: 'hidden',

                                width: "95%",

                                m: "10px",
                                p: "6px",

                                border: 3,
                                borderColor: '#e0dbce',
                                borderRadius: '15px'
                            }}>
                            <Grid
                                item
                                sx={{
                                    width: "20%",
                                    fontSize: "30px",
                                    fontWeight: "bold",

                                    p: "4px"
                                }}>
                                Question:
                            </Grid>
                            <Grid
                                item
                                sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    
                                    width: "79%",
                                    fontSize: "18px",
                                    
                                    ml: "5px",
                                    mt: "8px",
                                    p: "4px"
                                }}>
                                {this.props.problem["problem"]["question"]}
                            </Grid>
                        </Grid>
                        {this.props.problem["problem"]["Latex"] ?
                            <Grid 
                                item
                                sx={{
                                    display: 'flex',
                                flexGrow: 1,

                                fontFamily: 'Space Grotesk',
                                fontStyle: 'italic',

                                overflowWrap: 'break-word',
                                overflow: 'hidden',

                                width: "95%",

                                m: "10px",
                                p: "6px",

                                border: 3,
                                borderColor: '#e0dbce',
                                borderRadius: '15px'

                                }}>
                                <Grid
                                    item
                                    sx={{
                                        fontFamily: 'Space Grotesk',
                                        display: "absolute"
                                    }}>
                                        Latex
                                </Grid>
                            </Grid>
                        : ""}
                        {this.props.problem["problem"]["type"] == "MC" ? 
                            <Grid 
                                item
                                sx={{
                                    flexGrow: 1,
                                    display: 'flex',
                                    fontFamily: 'Space Grotesk',
                                    alignItems: 'center',
                                    justifyContent: 'space-evenly',
                                    width: "95%",
                                    
                                    m: "10px",
                                    p: "6px",

                                    border: 3,
                                    borderColor: '#e0dbce',
                                    borderRadius: '15px'
                                }}>
                                    <Grid
                                        item
                                        sx={{
                                            display: 'flex',
                                            fontFamily: 'Space Grotesk',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            width: "20%",
                                            height: "95%",
                                            bgcolor: '#ff7b00',

                                            color: 'white',

                                            borderRadius: '15px'
                                        }}>
                                        {this.props.problem["problem"]["type"] == "MC" ? this.props.problem["problem"]["answer"][0] : ""}
                                    </Grid>
                                    <Grid
                                        item
                                        sx={{
                                            display: 'flex',
                                            fontFamily: 'Space Grotesk',
                                            alignItems: 'center',
                                            justifyContent: 'center',

                                            width: "20%",
                                            height: "95%",
                                            bgcolor: '#56c90e',

                                            color: 'white',

                                            borderRadius: '15px'
                                        }}>
                                        {this.props.problem["problem"]["type"] == "MC" ? this.props.problem["problem"]["answer"][1] : ""}
                                    </Grid>
                                    <Grid
                                        item
                                        sx={{
                                            display: 'flex',
                                            fontFamily: 'Space Grotesk',
                                            alignItems: 'center',
                                            justifyContent: 'center',

                                            width: "20%",
                                            height: "95%",
                                            bgcolor: '#09cfd6',

                                            color: 'white',

                                            borderRadius: '15px'
                                        }}>
                                        {this.props.problem["problem"]["type"] == "MC" ? this.props.problem["problem"]["answer"][2] : ""}
                                    </Grid>
                                    <Grid
                                        item
                                        sx={{
                                            display: 'flex',
                                            fontFamily: 'Space Grotesk',
                                            alignItems: 'center',
                                            justifyContent: 'center',

                                            width: "20%",
                                            height: "95%",
                                            bgcolor: '#e827c5',

                                            color: 'white',
                                            borderRadius: '15px'
                                        }}>
                                        {this.props.problem["problem"]["type"] == "MC" ? this.props.problem["problem"]["answer"][3] : ""}
                                    </Grid>
                            </Grid>
                        : ""}
                        <Grid
                            item
                            sx={{
                                width: "90%",
                                display: 'flex',
                                flexGrow: 1,
                                fontFamily: 'Space Grotesk',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                            <FormControl 
                                sx={{
                                    width: '90%'
                                }} 
                                variant="outlined">
                                <InputLabel 
                                    sx={{
                                        mt: "-10px",
                                        fontFamily: "Space Grotesk",
                                        fontSize: '20px'
                                    }}>
                                    Answer</InputLabel>
                                <OutlinedInput
                                    multiline
                                    rows={3}
                                    onChange={(event) => {
                                        // this.setState({question: event.target.value});
                                    }}
                                    sx={{
                                        fontFamily: "Space Grotesk"
                                    }}/>
                            </FormControl>
                        </Grid>
                </Grid>
            </Grid>
        )
    }
}

export default Activity;