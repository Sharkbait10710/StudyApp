import * as React from 'react';

import {
    Container,
    Grid,
} from '@mui/material';

class Item extends React.Component {
    render() {
        return (
            <Grid 
                item 
                xl={this.props.xl}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    
                    height: '50%',

                    textAlign: 'center',
                    
                    border: 10,
                    borderColor: 'green'
                }}>
                {this.props.text}
            </Grid>
        )
    }
}

const Home = () => {
    document.body.style.overflow = 'hidden';
    return (
        <Container
            maxWidth={false}
            sx={{
                display: 'flex',
                
                alignItems: 'center',
                
                height: '100vh',
                
                border: 3,
                borderColor: 'black'}}>

            <Grid 
                container
                spacing={2}
                sx={{
                    display: 'flex',
                    alignItems: 'center',

                    width: '100%',
                    height: '100%',

                    bgcolor: 'blue',
                    color: 'white'}}>

            <Item xl={6} text={
                `This will
                definitely 
                work letsss
                goooo`
            }></Item>
            <Item xl={6} text="something"/>
            </Grid>
        </Container>
    )
}

export default Home;