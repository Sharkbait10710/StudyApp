import * as React               from 'react'
import { 
    Grid,
    FormControl,
    InputLabel,
    OutlinedInput,
    Button
} from '@mui/material';

import Latex                    from "react-latex"

import ReactCountdownClock      from "react-countdown-clock"
import CheckBoxIcon             from '@mui/icons-material/CheckBox'
import DisabledByDefaultIcon    from '@mui/icons-material/DisabledByDefault'
import DoubleArrowIcon          from '@mui/icons-material/DoubleArrow';

import { randomizenatList }     from '../utils/utility'

import { motion }               from "framer-motion"
class Activity extends React.Component {
    componentDidMount() {
        // When the component is mounted, add your DOM listener to the "nv" elem.
        // (The "nv" elem is assigned in the render function.)
        document.addEventListener("keypress", this.handleEnter);
      }
    
    componentWillUnmount() {
        // Make sure to remove the DOM listener when the component is unmounted.
        document.removeEventListener("keypress", this.handleEnter);
    }

    handleEnter = (event) => {
        if (event["key"]=="Enter") {
            if (this.state.showIncorrect) {
                this.props.nextHandler()
                clearTimeout(this.state.next)
                this.setState({"showIncorrect": false})
            } else {
                this.setState({"showIncorrect": true})
                this.props.timeoutHandler()
                this.setState({next: setTimeout(() => this.setState({"showIncorrect": false}), this.props.timeout)})
            }
        } 
    }

    constructor(props)
    {
        super(props);
        this.state = { 
            randomList : randomizenatList(4),
            showCorrect: false,
            showIncorrect: false,
            userInput : "",
            next: false
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
                        {this.props.problem["problem"]["Latex"]=="true" || this.state.showIncorrect ?
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
                                        top: "40%"
                                    }}>
                                        {!this.state.showIncorrect ? "Latex" : "Answer"}
                                </Grid>
                                <Grid
                                    item
                                    sx={{
                                        fontStyle: 'normal'
                                    }}>
                                {this.state.showIncorrect ? this.props.problem["problem"]["answer"][0] : <Latex>{this.state["userInput"]}</Latex>}
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
                                        onClick={() => {
                                            if (!this.state.showIncorrect) {
                                                if (this.props.answerHandler(this.state.randomList[0])) {
                                                    this.setState({"showCorrect": true})
                                                    setTimeout(() => {
                                                        this.setState({"showCorrect": false})
                                                        this.props.setHandler()
                                                    }, 1000)
                                                }
                                            }
                                        }}
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
                                        onClick={() => {
                                            if (this.props.answerHandler(this.state.randomList[1])) {
                                                this.setState({"showCorrect": true})
                                                setTimeout(() => {
                                                    this.setState({"showCorrect": false})
                                                    this.props.setHandler()
                                                }, 1000)
                                            }
                                        }}
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
                                        onClick={() => {
                                            if (this.props.answerHandler(this.state.randomList[2])) {
                                                this.setState({"showCorrect": true})
                                                setTimeout(() => {
                                                    this.setState({"showCorrect": false})
                                                    this.props.setHandler()
                                                }, 1000)
                                            }
                                        }}
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
                                        onClick={() => {
                                            if (this.props.answerHandler(this.state.randomList[3])) {
                                                this.setState({"showCorrect": true})
                                                setTimeout(() => {
                                                    this.setState({"showCorrect": false})
                                                    this.props.setHandler()
                                                }, 1000)
                                            }
                                        }}
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
                                            this.setState({"showCorrect": true})
                                            document.getElementById("answerInput").value = ""
                                            setTimeout(() => {
                                                this.setState({"showCorrect": false})
                                                this.props.setHandler()
                                            }, 1000)
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
                        left: '-9%',

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
                    {!(this.state.showIncorrect || this.state.showCorrect) ?
                        <motion.div
                            initial={{
                                scale: 0.1,
                                x: "-10vw",
                                y: "-80.5vh"
                            }}
                            animate={{
                                scale: 1.1
                            }}>
                            <Grid
                                item>
                                <ReactCountdownClock 
                                    seconds={30}
                                    color="#fa5f2f"
                                    alpha={0.9}
                                    size={70}
                                    onComplete={() => {
                                        this.setState({"showIncorrect": true})
                                        this.props.correctHandler()
                                        setTimeout(() => this.setState({"showIncorrect": false}), this.props.timeout)
                                    }} />
                            </Grid>
                        </motion.div> :
                    ""}

                    {this.state.showIncorrect ? 
                        <motion.div
                            initial={{
                                scale: 0.1,
                                x: "-100vw",
                                y: "-76vh"
                            }}
                            animate={{
                                scale: 1.1,
                                x: "-6.5vw"
                            }}
                            transition={{ type: "spring", duration: 0.4 }}>
                            <Grid
                            item
                            sx={{
                                fontWeight: 'bold',
                                transform: "scale(3)",
                                color: 'red'
                            }}>
                                <DisabledByDefaultIcon/>
                            </Grid> 
                        </motion.div>:
                    ""}

                    {this.state.showCorrect ? 
                        <motion.div
                            initial={{
                                scale: 0.1,
                                x: "-100vw",
                                y: "-76vh"
                            }}
                            animate={{
                                scale: 1.1,
                                x: "-6.5vw"
                            }}
                            transition={{ type: "spring", duration: 0.4 }}>
                            <Grid
                            item
                            sx={{
                                fontWeight: 'bold',
                                transform: "scale(3)",
                                color: '#28db09'
                            }}>
                                <CheckBoxIcon/>
                            </Grid> 
                        </motion.div>:
                    ""}     
                    <Button 
                        onClick={() => {
                            if (!this.state.showIncorrect) {
                                this.setState({"showIncorrect": true})
                                this.props.timeoutHandler()
                                this.setState({next: setTimeout(() => this.setState({"showIncorrect": false}), this.props.timeout)})
                            } else {
                                this.props.nextHandler()
                                clearTimeout(this.state.next)
                                this.setState({"showIncorrect": false})
                            }
                        }}
                        variant="contained" 
                        endIcon={<DoubleArrowIcon />}
                        sx={{
                            position: 'absolute',
                            bottom: '1.3%',
                            right: '-9.8%',
                            backgroundColor: '#fff',
                            color: '#fa5f2f',
                            transform: "scale(1.4)",
                            '&:hover': {
                                backgroundColor: '#fa5f2f',
                                color: '#e0dbce',
                                scale: '1.1'
                            },
                        }}>
                        {this.state.showIncorrect ? "Next" : "Skip"}
                    </Button>
            </Grid>
        )
    }
}

export default Activity;