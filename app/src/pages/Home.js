import * as React from 'react';
import {
    Link
} from 'react-router-dom';

import ArrowBackIosNewIcon  from '@mui/icons-material/ArrowBackIosNew'
import AddIcon              from '@mui/icons-material/Add'

import WebFont from 'webfontloader'

import {
    Container,
    Grid,

    IconButton
} from '@mui/material';

import {
    readfromStream
} from '../utils/utility'

const serverUrl = "http://localhost:3001";
const delayAmt  = 1;

class Item extends React.Component {
    render() {
        return (
            <Grid
                item
                sx = {{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexGrow: 1,

                    fontFamily: 'Space Grotesk',
                    textAlign: 'center',
                    fontSize: '20px',

                    border: 1,
                    borderColor: "#e0dbce",
                    
                    width: '40vh',
                    m: '10px',
                    p: '5px'
                }}>
                    <Link to={this.props.src}>{this.props.text}</Link>
            </Grid>
        );
    }
}

const getNames = (setFunction) => {
    getServerdata(serverUrl + "/database/names", setFunction);
}

const makeActivity = (name) => {
    makePost(serverUrl + "/database/new", {
        "name": name
    });
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
    console.log(JSONobj)
    fetch(url, {
        method: 'POST',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(JSONobj)
    })
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

    React.useEffect(() => {
        WebFont.load({
            google: {
            families: ['Space Grotesk']
            }
        });
    }, []);

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
                        alignItems: 'center',

                        border: 3,
                        borderColor: 'blue',
                    
                        
                        ml: '20vh',
                        mb: '15vh'
                    }}
                    id="left">
                        <Grid 
                            container
                            sx = {{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-evenly',
                                
                                fontFamily: 'Space Grotesk',
                                textAlign: 'center',
                                width: '100%',
                                height: '100%',

                                border: 3
                            }}>
                                <IconButton
                                    onClick={() => {
                                        getNames(setserverData);
                                        setTimeout(() => setbuttonState(!buttonState), delayAmt*10);
                                    }}
                                    sx = {{
                                        border: 1
                                    }}>
                                    <ArrowBackIosNewIcon/>
                                </IconButton>
                                {(buttonState && (serverData == null || serverData["return"] == null)) ? 
                                    <IconButton
                                        onClick={() => {
                                            makeActivity("flashcards");
                                        }}
                                        sx = {{
                                            border: 1
                                        }}>
                                        <AddIcon/>
                                    </IconButton> : 
                                    serverData == null ? "" :
                                    <Item text={
                                        `something is up`
                                    }/>

                                }
                        </Grid>
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
                                        {String(buttonState)}
                                        
                                </Grid>
                        </Grid>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Home;