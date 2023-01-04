import * as React from 'react';

import './style.css';

import WebFont from 'webfontloader'

import {
    Container,
    Grid,
    requirePropFactory
} from '@mui/material';

import AccessButton from '../components/AccessButton'
import AddButton    from '../components/AddButton'

import Form         from '../components/Form'
import NewActivity  from '../components/NewActivity'
import Options      from '../components/Options'
import Activity     from '../components/Activity'

const serverUrl = "http://localhost:3001";
const delayAmt  = 1;

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

    const [activityNames, setactivityNames] = React.useState(
        () => {
            return null;
        }
    )
    
    const [activityData, setactivityData] = React.useState(
        () => {
            return null;
        }
    )

    const [problem, setProblem] = React.useState(
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
    
    React.useEffect(() => {
        const checkUserInput = (event) => {
            try {
                if (!userInput.current.contains(event.target)) {
                    setreadyInput(false);
            }} catch (err) {}
        }
        document.addEventListener('mousedown', checkUserInput)
        
        return function clenupListener() {
            document.removeEventListener('mousedown', checkUserInput);
        }
    })

    React.useEffect(() => {
        const pressedTypes = (event) => {
            if (showForm && form != null) {
                let temp = form;
                try {
                    Object.keys(form["data"]).map((ele) => {
                        setTimeout(() => {
                            try {
                                temp["data"][ele]["type"] = document.getElementById("form type " + ele).getAttribute("value1")==0 ? "FR" : "MC";
                                temp["data"][ele]["Latex"] = document.getElementById("form type " + ele).getAttribute("value2")==0 ? false : true;
                            } catch (err) {}
                        }, delayAmt);
                    })
                } catch (err) {}
            }
        }

        document.addEventListener('mouseup', pressedTypes);

        return function cleanupListener() {
            document.removeEventListener('mouseup', pressedTypes);
        }
    })
    
    React.useEffect(() => {
        const handleKeypresses = (event) => {
            if (event.key==`Escape`) {
                setreadyInput(false);
                setshowForm(false);
                setForm({"name": null});
                setactivityData(null);
                setProblem(null);
            } else if (event.key=='Enter' && readyInput) {
                if (document.getElementById("UserInput").value=="") {
                    setreadyInput(false);
                    return;
                }
                let temp = form;
                temp["name"] = document.getElementById("UserInput").value;
                temp["size"] = 1;
                temp["data"] = {
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
                try {
                Object.keys(form["data"]).map((ele) => {
                    setTimeout(() => {
                        temp["data"][ele]["question"] = document.getElementById("form question " + ele).value;
                        console.log(temp["data"][ele]["answer"].length)
                        for (let i = 0; i < temp["data"][ele]["answer"].length; i++) {
                            try {
                                temp["data"][ele]["answer"][i] = document.getElementById("form answer " + i + " " + ele).value;
                            } catch (err) {}
                        }
                        console.log("Done")
                    }, delayAmt);
                })
            } catch (err) {}
            }
        }

        document.addEventListener('keydown', handleKeypresses);

        return function cleanupListener() {
            document.removeEventListener('keydown', handleKeypresses)
        }
    })
    // "listeners"
    let showSideAdd = buttonState && activityNames != null && activityNames["return"]["names"] != undefined && Object.keys(activityNames["return"]["names"]).length !== 0;
    let showMidButton = buttonState && (activityNames===null || activityNames["return"]["names"]===undefined || Object.keys(activityNames["return"]["names"]).length === 0);

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
                        ml: windowSize.innerWidth < 1236 ? "5%" : "25vh",
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
                            runFunction={() => {
                                fetch(serverUrl + "/database/names")
                                .then(response => {return response.json()})
                                .then(response => {
                                    setactivityNames(response)
                                    setbuttonState(true)
                                })
                            }} 
                            setFunction={setbuttonState}/>}
                        </Grid>
                        {   
                            !buttonState ? "" :
                            showMidButton ? <AddButton setFunction={setreadyInput}/> :
                                <Options 
                                    activityNames={activityNames["return"]["names"]}
                                    editFunction={(name) => {
                                        fetch(serverUrl + "/database/name/" + name)
                                        .then((response) => {
                                            return response.json();
                                        })
                                        .then((response) => {
                                            setshowForm(true);
                                            setForm(response["return"]);
                                        })
                                        .catch((err) => console.log(err))
                                    }}
                                    itemFunction={(name) => {
                                        fetch(serverUrl + "/database/name/" + name)
                                        .then((response) => {
                                            return response.json();
                                        })
                                        .then((response) => {
                                            console.log(response)
                                            var arr = [...Array(Object.keys(response["return"]["data"]).length).keys()];
                                            for (let i = arr.length - 1; i > 0; i--) {
                                                const j = Math.floor(Math.random() * (i + 1));
                                                const temp = arr[i];
                                                arr[i] = arr[j];
                                                arr[j] = temp;
                                            }
                                            console.log(arr);
                                            setactivityData(response["return"]["data"]);
                                            setProblem({
                                                "randomList": arr,
                                                "probNum": 0,
                                                "problem": response["return"]["data"][arr[0]],
                                                "yum": null
                                            });
                                        })
                                    }}
                                    removeFunction={(name) => {
                                        deleteActivity(name)
                                        let temp = activityNames
                                        delete temp["return"]["names"][name]
                                        setactivityNames(temp)
                                        setforceRender(!forceRender)
                                    }}
                                    />
                        }
                </Grid>

                {/*Pop Ups*/}
                <Grid
                    item
                    sx = {{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        
                        height: '185px',
                        mr: windowSize.innerWidth < 1500 < 1100 ? '5vh' : windowSize.innerWidth < 1500 ? '10vh' : '33vh',
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
            {
                readyInput  ? 
                    <NewActivity id="UserInput" inputRef={userInput}/> :
                showForm    ? 
                <Form 
                    data={form["data"]}
                    addFormEntry={() => {
                        let temp = form;
                        temp["size"] += 1;
                        temp["data"][temp["size"] - 1] = {
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
                        setForm(temp);
                        setforceRender(!forceRender);
                    }} 
                    commitActivity={() => {
                        makeActivity(form["name"], form["data"]);
                        setTimeout(() => {
                            setshowForm(false);
                            setForm({"name": null});
                            setTimeout(() => {
                                fetch(serverUrl + "/database/names")
                                .then(response => {return response.json()})
                                .then(response => {
                                    setactivityNames(response)
                                    setbuttonState(true)
                                })
                            }, delayAmt*50);
                        })
                    }}/> :
                activityData != null ? 
                    <Activity problem={problem}/>
                : ""
            }

        </Container>
    )
}

export default Home;