import * as React from 'react';
import {
    Link
} from 'react-router-dom';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'

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

const showMenu = (setFunction) => {
    let isTrue = false;
    fetch(serverUrl)
    .then((response) => {
        let arr = [];
        readfromStream(response, arr);
        setTimeout(() => {
            setFunction(arr[0] == "true");
        }, 1);
  });
}
const Home = () => {

    const [Study, setStudy] = React.useState(
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
            
            <p id="output">
                {Study ? 'yes' : 'no'}
            </p>
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
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                
                                fontFamily: 'Space Grotesk',
                                textAlign: 'center',
                                width: '100%',
                                height: '100%',

                                border: 3
                            }}>
                                <IconButton
                                    onClick={() => showMenu(setStudy)}
                                    sx = {{
                                        border: 1
                                    }}>
                                    <ArrowBackIosNewIcon/>
                                </IconButton>
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
                                        textDecorationLine: 'underline',
                                        textTransform: 'uppercase'
                                    }}>
                                        Pick something
                                </Grid>
                        </Grid>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Home;