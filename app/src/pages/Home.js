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

                    fontFamily: 'Space Grotesk',
                    textAlign: 'center',
                    fontSize: '20px',

                    width: '75%',

                    border: 'green'
                
                }}>
                    <Link 
                        to={this.props.src}
                        style={{
                            textDecoration: 'none'
                        }}>{this.props.text}</Link>
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
                        flexDirection: buttonState ? 'row' : 'row-reverse',
                        alignItems: 'center', 
                        justifyContent: 'space-between',

                        width: "25%",
                        ml: "15%",
                        mb: '15vh',

                        border: 3
                    }}
                    id="left">
                        <IconButton
                            onClick={() => {
                                getNames(setserverData);
                                setTimeout(() => setbuttonState(!buttonState), delayAmt*10);
                            }}
                            sx = {{
                                border: 1,
                                transform: "scale(1.7)"
                            }}>
                            <ArrowBackIosNewIcon/>
                        </IconButton>
                        {   (!buttonState) ? "" :
                            (serverData == null || serverData["return"] == null) ?
                                <IconButton
                                    onClick={() => {
                                        makeActivity("flashcards");
                                        setTimeout(() => getNames(setserverData), delayAmt*50);
                                    }}
                                    sx = {{
                                        border: 1,
                                        transform: "scale(1.7)"
                                    }}>
                                    <AddIcon/>
                                </IconButton> :
                                <Grid 
                                    container 
                                    sx = {{
                                        display: 'flex',
                                        flexDirection: 'column'
                                    }}>
                                    <Item text={
                                        `something is up`
                                    }/>
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
                                        {JSON.stringify(serverData)}
                                        
                                </Grid>
                        </Grid>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Home;