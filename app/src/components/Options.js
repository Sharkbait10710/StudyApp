import * as React   from 'react';
import { 
    Grid
} from '@mui/material';

import EditButton   from '../components/EditButton'
import RemoveButton from '../components/RemoveButton'
import Item         from '../components/Item'

class Options extends React.Component {
    
    render() {
        return (
            <Grid 
                container 
                sx = {{
                    display: 'flex',
                    flexDirection: 'column',
                    flexWrap: 'nowrap',
                    justifyContent: Object.keys(this.props.activityNames).length > 8 ? '' : 'center',
                    alignItems: 'center',
                    height: "40vh",
                    width: "100vh",

                    overflowY: 'auto',
                    overflowX: 'hidden'
                }}>
                    {
                        Object.keys(this.props.activityNames).map(
                            (name) => 
                            <Grid
                                item
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',

                                    width: "90%",
                                    border: 1,
                                    borderColor: "#e0dbce",
                                    borderRadius: "15px",

                                    mb: "5px"
                                }}
                                key={"Grid " + name}
                                >
                                <EditButton 
                                    runFunction={() => this.props.editFunction(name)}/>
                                <Item 
                                    text={name}
                                    runFunction={() => this.props.itemFunction(name)}
                                    />
                                <RemoveButton runFunction={() => this.props.removeFunction(name)}/>
                            </Grid>
                        )
                    }
            </Grid>
        )
    }
}

export default Options;