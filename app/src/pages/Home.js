import * as React from 'react';

import {
    Link
} from 'react-router-dom';

import './style.css';

import ArrowBackIosNewIcon  from '@mui/icons-material/ArrowBackIosNew'
import AddIcon              from '@mui/icons-material/Add'
import AddCircleIcon        from '@mui/icons-material/AddCircle';
import RemoveIcon           from '@mui/icons-material/Remove'
import CreateIcon           from '@mui/icons-material/Create'
import LabelImportantIcon   from '@mui/icons-material/LabelImportant'

import WebFont from 'webfontloader'
import Textfit from 'react-textfit'

import {
    Container,
    Grid,

    IconButton,

    Input,
    Button,

    Radio,
    Checkbox,

    FormControl,
    InputLabel,
    OutlinedInput
} from '@mui/material';

import {
    readfromStream
} from '../utils/utility'

const serverUrl = "http://localhost:3001";
const delayAmt  = 1;

class AccessButton extends React.Component {
    render() {
        return (
            <IconButton
                onClick={() => {
                    let _ = !this.props.cond ? getNames(this.props.runFunction) : 1 == 1;
                    setTimeout(() => this.props.setFunction(!this.props.cond), delayAmt*10);
                }}
                sx = {{
                    border: 1,
                    transform: "scale(1.7)"
                }}>
                <ArrowBackIosNewIcon/>
            </IconButton>
        )
    }
}

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
                    mr: this.props.cond ? '16px' : "auto"
                }}>
                <AddIcon/>
            </IconButton>
        )
    }
}

class RemoveButton extends React.Component {
    render() {
        return (
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
                <RemoveIcon/>
            </IconButton>
        )
    }
}

class EditButton extends React.Component {
    render() {
        return (
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
        )
    }
}

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
                
                }}>
                    <Link 
                        to={this.props.src}
                        style={{
                        }}>
                            <Textfit mode="single">{this.props.text}</Textfit>
                    </Link>
            </Grid>
        );
    }
}

class FormEntry extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = { 
            radio : 0,
            checkbox: 0
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
                                        console.log(event.target.value);
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
                                    checked={this.state.radio == 0}
                                    onChange={(event) => {
                                            this.setState({radio: event.target.value});
                                        }}
                                    value="0"
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
                                    checked={this.state.radio == 1}
                                    onChange={(event) => {
                                        this.setState({radio: event.target.value});
                                    }}
                                    value="1"
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
                                    checked={this.state.checkbox == 1}
                                    onChange={() => {
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
                    { this.state.radio == 0 ?
                        <Grid
                            item
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: 'center',
                                width: "90%",
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
                                    answer</InputLabel>
                                <OutlinedInput
                                    multiline
                                    rows={3}
                                    id={"form answer 0 " + this.props.id}
                                    sx={{
                                        fontFamily: "Space Grotesk"
                                    }}
                                    inputProps={{
                                        defaultValue: this.props.answer[0]
                                    }}/>
                            </FormControl>
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
                                            answer {ele + 1}</InputLabel>
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

const getNames = (setFunction) => {
    getServerdata(serverUrl + "/database/names", setFunction);
}

const makeActivity = (name, data) => {
    makePost(serverUrl + "/database/new", {
        "name": name,
        "body": JSON.stringify({
            data
        })
    });
}

const deleteActivity = (name) => {
    makePost(serverUrl + "/database/remove", {
        "name": name
    })
}

// =====    Helper Functions    ===== //
const getServerdata = (url, setFunction) => {
    fetch(url)
    .then((response) => {
        let arr = [];
        readfromStream(response, arr);
        setTimeout(() => setFunction(JSON.parse(arr[0]), delayAmt));
    })
}

const makePost = (url, JSONobj) => {
    fetch(url, {
        method: 'POST',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(JSONobj)
    }).catch((err) =>{})
}

const Home = () => {
    
    const [windowSize, setWindowSize] = React.useState(getWindowSize());

  React.useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

function getWindowSize() {
  const {innerWidth, innerHeight} = window;
  return {innerWidth, innerHeight};
}

    const [serverData, setserverData] = React.useState(
        () => {
            return null;
        }
    )

    const [buttonState, setbuttonState] = React.useState(
        () => {
            return false;
        }
    )

    const [readyInput, setreadyInput] = React.useState(
        () => {
            return false;
        }
    )

    const [showForm, setshowForm] = React.useState(
        () => {
            return false;
        }
    )

    const [form, setForm] = React.useState(
        () => {
            return {
                "name": null
            };
        }
    )

    const [forceRender, setforceRender] = React.useState(
        () => {
            return false;
        }
    )

    React.useEffect(() => {
        WebFont.load({
            google: {
            families: ['Space Grotesk']
            }
        });
    }, []);

    let userInput = React.useRef();

    document.addEventListener('mousedown', (event) => {
        try {
        if (!userInput.current.contains(event.target)) {
            setreadyInput(false);
        }} catch (err) {}
    })
    
    document.addEventListener('mouseup', (event) => {
        if (showForm) {
            let temp = form;
            Object.keys(form["questions"]).map((ele) => {
                setTimeout(() => {
                    temp["questions"][ele]["type"] = document.getElementById("form type " + ele).getAttribute("value1") == 0 ? "FR" : "MC";
                    temp["questions"][ele]["Latex"] = document.getElementById("form type " + ele).getAttribute("value2") == 0 ? false : true;

                    console.log(temp);
                }, delayAmt);
            })
        }
    })
    document.addEventListener('keydown', (event) => {
        if (event.key == `Escape`) {
            setreadyInput(false);
            setshowForm(false);
            setForm({"name": null});
        } else if (event.key == 'Enter' && readyInput) {
            if (document.getElementById("UserInput").value == "") {
                setreadyInput(false);
                return;
            }
            let temp = form;
            temp["name"] = document.getElementById("UserInput").value;
            temp["size"] = 1;
            temp["questions"] = {
                0: {
                    "question": "",
                    "answer": [
                        "",
                        "",
                        "",
                        ""
                    ],
                    "type": "FR",
                    "Latex": false
                }
            };
            setForm(temp);
            setshowForm(true);
            setTimeout(() => setreadyInput(false), delayAmt);
        } else if (showForm) {
            let temp = form;
            Object.keys(form["questions"]).map((ele) => {
                setTimeout(() => {
                    temp["questions"][ele]["question"] = document.getElementById("form question " + ele).value;

                    for (let i = 0; i < temp["questions"][ele]["answer"].length; i++) {
                        try {
                            temp["questions"][ele]["answer"][i] = document.getElementById("form answer " + i + " " + ele).value;
                        } catch (err) {}
                    }

                }, delayAmt);
            })
        }
    });
    
    // "listeners"
    let showSideAdd = buttonState && serverData != null && serverData["return"]["names"] != undefined && Object.keys(serverData["return"]["names"]).length !== 0;
    let showMidButton = buttonState && (serverData == null || serverData["return"]["names"] == undefined || Object.keys(serverData["return"]["names"]).length === 0);

    document.body.style.overflow = 'hidden';

    return (
        <Container
            maxWidth={false}
            sx={{
                display: 'flex',
                justifyContent: 'center',
                
                height: '98vh'}}>
            
            <Grid 
                container
                sx = {{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>

                <Grid
                    item
                    sx = {{
                        display: 'flex',
                        flexDirection: buttonState ? 'row' : 'row-reverse',
                        alignItems: 'center', 
                        justifyContent: 'space-between',

                        width: buttonState ? "30%" : "15%",
                        ml: "15%",
                        mb: '15vh'
                    }}
                    id="left">
                        <Grid
                            container 
                            sx = {{
                                display: 'flex',
                                flexDirection: showMidButton || showSideAdd ? 'row' : 'row-reverse',
                                alignItems: 'center', 
                                justifyContent: 'space-between'
                            }}
                        >
                            {showSideAdd ? <AddButton cond={showSideAdd} setFunction={setreadyInput}/> : 
                            <AccessButton 
                            cond={buttonState} 
                            runFunction={setserverData} 
                            setFunction={setbuttonState}/>}
                        </Grid>

                        {   
                            !buttonState ? "" :
                            showMidButton ? <AddButton setFunction={setreadyInput}/> :
                                <Grid 
                                    container 
                                    sx = {{
                                        display: 'flex',
                                        flexDirection: 'column'
                                    }}>
                                        {
                                            Object.keys(serverData["return"]["names"]).map(
                                                (name) => 
                                                <Grid
                                                    item
                                                    sx={{
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        alignItems: 'center',

                                                        border: 1,
                                                        borderColor: "#e0dbce",
                                                        borderRadius: "15px",

                                                        m: "3px"
                                                    }}
                                                    key={"Grid " + name}
                                                    >
                                                    <EditButton />
                                                    <Item text={name}/>
                                                    <RemoveButton runFunction={
                                                        () => {
                                                            deleteActivity(name);
                                                            setTimeout(() => getNames(setserverData), delayAmt*50);
                                                        }
                                                    }/>
                                                </Grid>
                                            )
                                        }
                                </Grid>
                        }
                </Grid>
                <Grid
                    item
                    sx = {{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        
                        height: '185px',
                        mr: windowSize.innerWidth < 1300 || buttonState ? '14vh' : '30vh',
                        mb: '10vh'
                    }}
                    id="right">
                        <Grid 
                            container
                            sx = {{
                                display: 'flex',
                                flexDirection: 'column',
                                
                                fontFamily: 'Space Grotesk',
                                textAlign: 'center',
                                width: '100%',
                                height: '100%'
                            }}>
                                <Grid
                                    item
                                    sx = {{
                                        fontWeight: 'bold',
                                        fontSize: '80px',
                                        
                                        border: 3,
                                        borderColor: '#e0dbce',
                                        borderRadius: '15px',
                                        mb: '1%',
                                        p: '10px'
                                    }}>
                                    Study App
                                </Grid>
                                <Grid
                                    item
                                    sx = {{
                                        fontSize: '20px',
                                        textTransform: 'uppercase',
                                        textDecoration: 'underline'
                                    }}>
                                        Press something
                                </Grid>
                        </Grid>
                </Grid>
            </Grid>
            {readyInput ? 
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
                                    ref={userInput}
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
            : form["name"] != null ? 
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
                            {showForm ? 
                            <Grid
                                item
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    boxShadow: "0 0 0 max(100vh, 100vw) rgba(0, 0, 0, .6)",
                                    
                                    width: "100%",
                                    height: "100%",
                                    textAlign: "center",
        
                                    bgcolor: "white",
        
                                    borderRadius: '15px',

                                    overflowY: "scroll",
                                    overflowX: "hidden"
                                }}>
                                {
                                Object.keys(form["questions"]).map((ele) => {
                                    return (
                                        <FormEntry key={"form " + String(ele)} id={String(ele)} question="fasraer" answer={["0", "1", "2", "3"]}/>
                                    )
                                })}
                                <Grid
                                    item
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        width: "95%",
                                        height: "10vh",

                                        border: 3,
                                        borderStyle: 'dotted',
                                        borderRadius: '20px',
                                        borderColor: '#e0dbce'
                                    }}>
                                    <IconButton
                                        onClick={() => {
                                            let temp = form;
                                            temp["size"] += 1;
                                            temp["questions"][temp["size"] - 1] = {
                                                    "question": "",
                                                    "answer": [
                                                        "",
                                                        "",
                                                        "",
                                                        ""
                                                    ],
                                                    "type": "FR"
                                                }
                                            setForm(temp);
                                            setforceRender(!forceRender);
                                        }}
                                        sx = {{
                                            transform: "scale(1.7)",
                                            color: "#fa5f2f"
                                        }}>
                                        <AddCircleIcon/>
                                    </IconButton>
                                </Grid>
                            </Grid>
                            : ""}
                    </Grid>
                    <Button 
                        onClick={() => {
                            makeActivity(form["name"], form["questions"]);
                            setTimeout(() => {
                                setshowForm(false);
                                setForm({"name": null});
                            })
                        }}
                        variant="contained" 
                        endIcon={<LabelImportantIcon />}
                        sx={{
                            position: 'absolute',
                            bottom: '-5%',
                            right: '0%',
                            backgroundColor: '#fff',
                            color: '#fa5f2f',

                            '&:hover': {
                                backgroundColor: '#fa5f2f',
                                color: '#e0dbce',
                            },
                        }}>
                        Commit
                    </Button>
                </Grid> :
            ""}

        </Container>
    )
}

export default Home;