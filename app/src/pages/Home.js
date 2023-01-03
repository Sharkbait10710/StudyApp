import * as React from 'react';

import {
    Link
} from 'react-router-dom';

import './style.css';

import ArrowBackIosNewIcon  from '@mui/icons-material/ArrowBackIosNew'
import AddIcon              from '@mui/icons-material/Add'
import RemoveIcon           from '@mui/icons-material/Remove'
import CreateIcon           from '@mui/icons-material/Create'

import WebFont from 'webfontloader'
import Textfit from 'react-textfit'

import {
    Container,
    Grid,

    IconButton,
    Input
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

const getNames = (setFunction) => {
    getServerdata(serverUrl + "/database/names", setFunction);
}

const makeActivity = (name) => {
    makePost(serverUrl + "/database/new", {
        "name": name,
        "body": JSON.stringify({
            "test": "test"
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

    const [form, setForm] = React.useState(
        () => {
            return {
                "name": null
            };
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
    
    document.addEventListener('keydown', (event) => {
        if (event.key == 'Enter' && readyInput) {
            let input = document.getElementById("UserInput").value;
            if (input != null && input != "") {
                makeActivity(document.getElementById("UserInput").value);
                setTimeout(() => getNames(setserverData), delayAmt*50);
            }
            setTimeout(() => setreadyInput(false), delayAmt);
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

                        width: "30%",
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
                        mr: '21vh',
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

                        color: 'red',
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
            : ""}

        </Container>
    )
}

export default Home;