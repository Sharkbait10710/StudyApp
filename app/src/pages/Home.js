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
                xs={this.props.xs}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    
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
    return (
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

            <Item xs={6} text={
                `This will
                definitely 
                work letsss
                goooo`
            }></Item>
            <Item xs={6} text="something"/>
            </Grid>
        </Container>
    )
}

export default Home;