import * as React   from 'react';
import { Link }     from 'react-router-dom';
import Textfit      from 'react-textfit'
import { Grid }     from '@mui/material';

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
                        onClick={
                            () => this.props.runFunction()
                        }
                        style={{
                        }}>
                            <Textfit mode="single">{this.props.text}</Textfit>
                    </Link>
            </Grid>
        );
    }
}

export default Item;