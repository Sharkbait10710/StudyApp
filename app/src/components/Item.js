import * as React   from 'react';
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

                    overFlowX: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    display: "block",
                    overflow: "hidden"
                
                }}>
                    {this.props.text}
                    {/* <Link 
                        onClick={
                            () => this.props.runFunction()
                        }
                        style={{
                            display: "block"
                        }}>
                            <Textfit mode="single">{this.props.text}</Textfit>
                    </Link> */}
            </Grid>
        );
    }
}

export default Item;