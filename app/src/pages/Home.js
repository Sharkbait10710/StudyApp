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
    readfromStream,
    waitFunc
} from '../utils/utility'

const serverUrl = "http://localhost:3001";
const delayAmt  = 5;

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
    fetch(serverUrl + "/database/names")
    .then((response) => {
        let arr = [];
        readfromStream(response, arr);
        setTimeout(() => setFunction(JSON.stringify(arr[0]).replaceAll('\\', ' ')), delayAmt);
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
                        
                        width: '40vh',
                        
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
                                        setbuttonState(!buttonState);
                                    }}
                                    sx = {{
                                        border: 1
                                    }}>
                                    <ArrowBackIosNewIcon/>
                                </IconButton>
                                {buttonState ? 
                                <IconButton
                                    onClick={() => {
                                    }}
                                    sx = {{
                                        border: 1
                                    }}>
                                    <AddIcon/>
                                </IconButton> : ""}
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
                                        fontSize: '20px'
                                    }}>
                                        {
                                        String(serverData == null ? null : JSON.parse(serverData))}
                                </Grid>
                        </Grid>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Home;