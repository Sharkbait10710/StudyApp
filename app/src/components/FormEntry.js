import * as React   from 'react';
import {
    Grid,
    Radio,
    Checkbox,
    FormControl,
    InputLabel,
    OutlinedInput
} from '@mui/material';

import Latex        from "react-latex"

class FormEntry extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = { 
            radio : this.props.type == "MC",
            checkbox: this.props.latex,
            userInput: ""
        };
    }
    
    render() {
        return (
            <Grid
                item
                sx={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    
                    width: "95%",
                    height: "30%",
                    bgcolor: "white",

                    border: 3,
                    borderColor: '#e0dbce',
                    borderRadius: '30px',

                    m: "10px"
                }}>
                <Grid
                    item
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "space-evenly",
                        
                        width: "45%",
                        height: "90%",

                        m: "10px"
                }}>
                    <Grid
                        item
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "100%",
                            height: "60%",

                            m: "10px"
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
                                    Question</InputLabel>
                                <OutlinedInput
                                    multiline
                                    rows={3}
                                    onChange={(event) => {
                                        this.setState({question: event.target.value});
                                    }}
                                    id={"form question " + this.props.id}
                                    sx={{
                                        fontFamily: "Space Grotesk"
                                    }}
                                    inputProps={{
                                        defaultValue: this.props.question
                                    }}/>
                            </FormControl>
                    </Grid>
                    <Grid
                        item
                        id={"form type " + this.props.id}
                        value1={String(this.state.radio)}
                        value2={String(this.state.checkbox)}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            width: "90%",

                            border: 3,
                            borderColor: '#e0dbce',
                            borderRadius: '10px',

                            m: "10px"
                        }}>
                        <div style={{
                            margin: "5px",
                            fontSize: "18px",
                            fontWeight: "bold",
                            fontFamily: "Space Grotesk"
                        }}>Type</div>
                        <Grid 
                            container
                            sx={{
                                display: 'flex'
                            }}>
                            <Grid
                                item
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    flexGrow: 1,
                                    fontFamily: "Space Grotesk"
                                }}>
                                <Radio
                                    checked={this.state.radio==0}
                                    onChange={(event) => {
                                            this.setState({radio: 0});
                                        }}
                                    value="FR"
                                    name="radio-buttons"
                                    id={"form FR " + this.props.id}
                                    sx={{
                                        '&.Mui-checked': {
                                            color: "#fa5f2f",
                                        }
                                    }}
                                />
                                FR
                            </Grid>
                            <Grid
                                item
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    flexGrow: 1,

                                    fontFamily: "Space Grotesk"
                                }}>
                                <Radio
                                    checked={this.state.radio==1}
                                    onChange={(event) => {
                                        this.setState({radio: 1});
                                    }}
                                    value="MC"
                                    name="radio-buttons"
                                    id={"form MC " + this.props.id}
                                    sx={{
                                        '&.Mui-checked': {
                                            color: "#fa5f2f",
                                        }
                                    }}/>
                                MC
                            </Grid>
                            <Grid
                                item
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    flexGrow: 1,

                                    fontFamily: "Space Grotesk"
                                }}>
                                <Checkbox
                                    checked={this.state.checkbox==1}
                                    onClick={() => {
                                        this.setState({checkbox: !this.state.checkbox})
                                    }}
                                    value="1"
                                    id={"form Latex " + this.props.id}
                                    sx={{
                                        '&.Mui-checked': {
                                            color: "#fa5f2f",
                                        }
                                    }}/>
                                Latex
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid
                    item
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-evenly",
                        
                        width: "45%",
                        height: "90%",

                        m: "10px"
                    }}>
                    { this.state.radio==0 ?
                        <Grid
                            item
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: 'center',
                                width: "90%",
                                height: "90%",

                                m: "10px"
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
                                    correct answer</InputLabel>
                                <OutlinedInput
                                    multiline
                                    rows={3}
                                    onChange={(event) => {
                                        this.setState({userInput: event.target.value})
                                    }}

                                    id={"form answer 0 " + this.props.id}
                                    sx={{
                                        fontFamily: "Space Grotesk"
                                    }}
                                    inputProps={{
                                        defaultValue: this.props.answer[0]
                                    }}/>
                            </FormControl>
                            {
                                this.state.checkbox ? 
                                <Grid
                                    item
                                    sx={{
                                        mt: "4%",
                                        width: "100%",

                                        fontFamily: "Space Grotesk"
                                    }}><Latex>{this.state.userInput}</Latex></Grid>
                                : ""
                            }
                        </Grid> : 
                        <Grid
                            item
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                width: '90%',
                                height: '95%',

                                mt: '-10px'
                            }}>
                            {[0, 1, 2, 3].map((ele) => 
                                <Grid
                                    item
                                    key={ele}>
                                    <FormControl 
                                        sx={{ 
                                            m: 1, 
                                            width: '90%',
                                            m: '10px'
                                        }} 
                                        variant="outlined">
                                        <InputLabel 
                                            sx={{
                                                mt: "-10px",
                                                fontFamily: "Space Grotesk"
                                            }}>
                                            {ele == 0 ? "correct answer" :  "answer " + (ele + 1)}</InputLabel>
                                        <OutlinedInput
                                            multiline
                                            rows={1}
                                            id={"form answer " + ele + " " + this.props.id}
                                            sx={{
                                                height: '3.5vh',
                                                fontFamily: "Space Grotesk"
                                            }}
                                            inputProps={{
                                                defaultValue: this.props.answer[ele]
                                            }}/>
                                    </FormControl>
                                </Grid>
                            )}
                        </Grid>
                    }
                </Grid>
            </Grid>
        )
    }
}

export default FormEntry;