import * as React from 'react';
import {
    styled
} from '@mui/material/styles'
import {
    Container,
    Box,
    Grid,
    Paper
} from '@mui/material';

import {
    makePost
 } from '../utils/api';
 
 import {
    stateinitVal
  } from '../utils/utility';

 const serverUrl = "http://localhost:3001";

const Home = () => {
    // =====  States  ===== //
    // const [userInput, setuserInput] = useState(stateinitVal(""));
  
    // useEffect(() => {
    //     document.getElementById("output").setHTML(userInput);
    // });

    return (
        // <div>
        //     <p id="output"></p>
        //     <p><input id="userInput" onInput={() => setuserInput(document.getElementById("userInput").value)}/></p>
        //     <button id ="Button" onClick={() => makePost(serverUrl, {"test": "1"})}>Press Me</button>
        // </div>
        <Container
            minHeight='100vh'
            sx={{
                bgcolor: 'red',
                width: '50%',
                height: '50vh'}}>
            
            <Grid 
                container
                sx={{
                    bgcolor: 'blue',
                    width: '100%',
                    height: '100%',
                    color: 'white'}}>

                <Grid 
                    item 
                    xs={6}
                    sx={{
                        textAlign: 'center',
                        textTransform: 'uppercase'
                    }}>
                    something important
                </Grid>
                <Grid 
                    item 
                    xs={6}
                    sx={{
                        textAlign: 'center',
                        textTransform: 'uppercase'
                    }}>
                    something important
                </Grid>
            </Grid>
        </Container>
    )
}

export default Home;