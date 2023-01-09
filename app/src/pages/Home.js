import * as React from 'react';

import './style.css';

import WebFont from 'webfontloader'

import {
    Container,
    Grid
} from '@mui/material';

import AccessButton             from '../components/AccessButton'
import AddButton                from '../components/AddButton'

import Form                     from '../components/Form'
import NewActivity              from '../components/NewActivity'
import Options                  from '../components/Options'
import Activity                 from '../components/Activity'

import { motion }               from "framer-motion";
import { randomizenatList }     from '../utils/utility'

import background               from "../imgs/bgImage5.jpg"

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

    const [stats, setStats] = React.useState(
        () => {
            return {
                "totalQuestion": 0,
                "totalCorrect": 0
            }
        }
    )
    
    let next = null;

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
                                let val1 = document.getElementById("form type " + ele).getAttribute("value1")
                                let val2 = document.getElementById("form type " + ele).getAttribute("value2")
                                temp["data"][ele]["type"] = val1==false ? temp["data"][ele]["type"] : val1==1 ? "MC" : "FR";
                                temp["data"][ele]["Latex"] = val2 == "undefined" ? temp["data"][ele]["Latex"] : val2;
                            } catch (err) {}
                        }, delayAmt);
                    })
                    setForm(temp);
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
                        for (let i = 0; i < temp["data"][ele]["answer"].length; i++) {
                            try {
                                temp["data"][ele]["answer"][i] = document.getElementById("form answer " + i + " " + ele).value;
                            } catch (err) {}
                        }
                    }, delayAmt);
                })
                setForm(temp);
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

                position: 'absolute',
                left: '0%',
                top: '0%',

                height: '100vh'}}
            style={{
                backgroundImage: `url(${background})`

            }}>
            {activityData == null ? 
                <Grid 
                    container
                    sx = {{
                        display: 'flex',
                        flexDirection: windowSize.innerWidth < 1300 ? 'column-reverse' : 'row',
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

                            width:  "30%",
                            ml: windowSize.innerWidth < 1300 ? '0vh' : "13vh",
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
                                    <motion.div
                                        initial={{
                                            x: '-100vw'
                                        }}
                                        animate={{
                                            x: '0vw'
                                        }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 25,
                                            duration: 1
                                        }}>
                                        <AccessButton 
                                        cond={buttonState}
                                        runFunction={() => {
                                            fetch(serverUrl + "/database/names")
                                            .then(response => {return response.json()})
                                            .then(response => {
                                                setactivityNames(response)
                                                setbuttonState(!buttonState)
                                            })
                                        }} 
                                        setFunction={setbuttonState}/>
                                    </motion.div>
                                    }
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
                                            .catch((err) => {})
                                        }}
                                        itemFunction={(name) => {
                                            fetch(serverUrl + "/database/name/" + name)
                                            .then((response) => {
                                                return response.json();
                                            })
                                            .then((response) => {
                                                var arr = Object.keys(response["return"]["data"])
                                                arr.splice(arr.indexOf("empty"), 1)
                                                arr = randomizenatList(arr)
                                                setactivityData(response["return"]["data"]);
                                                setProblem({
                                                    "randomList": arr,
                                                    "probNum": arr[0],
                                                    "problem": response["return"]["data"][arr[0]]
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
                    <motion.div
                        initial={{
                            x: '100vw',
                        }}
                        animate={{
                            x: '0vw'
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 25,
                            duration: 1,
                        }}>
                        <Grid
                            item
                            sx = {{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                
                                height: '185px',
                                mt: windowSize.innerWidth < 1300 ? '8vh' : '0vh',
                                mr: windowSize.innerWidth < 1300 ? '0vh' : 
                                    windowSize.innerWidth < 1500 ? '20vh': '50vh',
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
                    </motion.div>
                </Grid> :
            ""}

            <Grid
                item
                sx={{
                    display: 'absolute',
                    top: '5%'
                }}>
                </Grid>
            {
                readyInput  ? 
                    <NewActivity id="UserInput" inputRef={userInput}/> :
                showForm    ? 
                <Form 
                    data={form["data"]}
                    addFormEntry={() => {
                        let temp = form;
                        let keyName = temp["data"]["empty"] == undefined ? Object.keys(temp["data"]).length :
                            temp["data"]["empty"][0] == undefined ? Object.keys(temp["data"]).length-1 : temp["data"]["empty"].pop()
                        temp["data"][keyName] = {
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
                    deleteFormEntry={(num) => {
                        let temp = form;
                        if (temp["data"]["empty"] == undefined) temp["data"]["empty"] = [];
                        temp["data"]["empty"].push(num);
                        delete temp["data"][num]
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
                                    setforceRender(!forceRender)
                                })
                            }, delayAmt*500);
                        })
                    }}/> :
                activityData != null ? 
                    <Activity 
                        problem={problem}
                        stats={stats}
                        timeout={15000}
                        answerHandler={(input) => {
                            if (problem["problem"]["type"] == "MC" && input == 0) {
                                return true
                            } else if (problem["problem"]["type"] == "FR" && input == problem["problem"]["answer"][0]) {
                                return true
                            }
                        }}
                        setHandler={() => {
                            let temp = problem;
                            temp["probNum"] = (temp["probNum"] + 1) % temp["randomList"].length;
                            temp["problem"] = activityData[temp["probNum"]];
                            setProblem(temp);

                            temp = stats;
                            temp["totalQuestion"] += 1;
                            temp["totalCorrect"] += 1;
                            setStats(temp);

                            setforceRender(!forceRender);
                        }}
                        timeoutHandler={() => {
                            next = setTimeout(() => {
                                let temp = problem;
                                temp["probNum"] = (temp["probNum"] + 1) % temp["randomList"].length;
                                temp["problem"] = activityData[temp["probNum"]];
                                setProblem(temp);

                                temp = stats;
                                temp["totalQuestion"] += 1;
                                setStats(temp);

                                setforceRender(!forceRender);

                                return true;
                            }, 15000)
                        }}
                        nextHandler={() => {
                            clearTimeout(next);
                            let temp = problem;
                            temp["probNum"] = (temp["probNum"] + 1) % temp["randomList"].length;
                            temp["problem"] = activityData[temp["probNum"]];
                            setProblem(temp);

                            temp = stats;
                            temp["totalQuestion"] += 1;
                            setStats(temp);

                            setforceRender(!forceRender);
                        }}/>
                : ""
            }
        </Container>
    )
}

export default Home;