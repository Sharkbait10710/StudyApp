import * as React           from 'react'
import { 
    Grid,
    FormControl,
    InputLabel,
    OutlinedInput
} from '@mui/material';

import Latex                from "react-latex"
import { randomizenatList } from '../utils/utility'

class Activity extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = { 
            randomList : randomizenatList(4),
            userInput : ""
        };
    }

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
                                <Latex>{this.props.problem["problem"]["question"]}</Latex>
                            </Grid>
                        </Grid>
                        {this.props.problem["problem"]["Latex"] ?
                            <Grid 
                                item
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItem: 'center',
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
                                        position: "absolute",
                                        left: "5%",
                                        top: "36%"
                                    }}>
                                        Latex
                                </Grid>
                                <Grid
                                    item
                                    sx={{
                                        fontStyle: 'normal'
                                    }}>
                                <Latex>{this.state["userInput"]}</Latex>
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
                                        onClick={() => this.props.answerHandler(this.state.randomList[0])}
                                        className="multipleChoice"
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
                                        {this.props.problem["problem"]["answer"][this.state.randomList[0]]}
                                    </Grid>
                                    <Grid
                                        item
                                        onClick={() => this.props.answerHandler(this.state.randomList[1])}
                                        className="multipleChoice"
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
                                        {this.props.problem["problem"]["answer"][this.state.randomList[1]]}
                                    </Grid>
                                    <Grid
                                        item
                                        onClick={() => this.props.answerHandler(this.state.randomList[2])}
                                        className="multipleChoice"
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
                                        {this.props.problem["problem"]["answer"][this.state.randomList[2]]}
                                    </Grid>
                                    <Grid
                                        item
                                        onClick={() => this.props.answerHandler(this.state.randomList[3])}
                                        className="multipleChoice"
                                        sx={{
                                            display: 'flex',
                                            fontFamily: 'Space Grotesk',
                                            alignItems: 'center',
                                            justifyContent: 'center',

                                            width: "20%",
                                            height: "95%",
                                            bgcolor: '#e827c5',

                                            color: 'white',
                                            borderRadius: '15px',
                                        }}>
                                        {this.props.problem["problem"]["answer"][this.state.randomList[3]]}
                                    </Grid>
                            </Grid>
                        : 
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
                                    id={"answerInput"}
                                    onChange={(event) => {
                                        if (this.props.answerHandler(event.target.value)) {
                                            document.getElementById("answerInput").value = ""
                                        }
                                        this.setState({userInput: event.target.value})
                                    }}
                                    sx={{
                                        fontFamily: "Space Grotesk"
                                    }}/>
                            </FormControl>
                        </Grid>}
                </Grid>

                <Grid
                    item
                    sx={{
                        position: 'absolute',
                        top: '-5%',
                        left: '-10%',

                        fontFamily: 'Space Grotesk',
                        fontSize: '40px',
                        fontWeight: 'bold',
                        color: 'green'
                    }}>
                        <Grid 
                            item
                            sx={{
                            }}>
                                {this.props.stats["totalCorrect"]}
                        </Grid>
                        <Grid 
                            item
                            sx={{
                                position: 'absolute',
                                left: '90%',
                                bottom: '-23%',
                                transform: 'rotate(30deg)'
                            }}>
                                /
                        </Grid>
                        <Grid 
                            item
                            sx={{
                                position: 'absolute',
                                left: '110%',
                                bottom: '-70%',
                            }}>
                                {this.props.stats["totalQuestion"]}
                        </Grid>
                    </Grid>
            </Grid>
        )
    }
}

export default Activity;