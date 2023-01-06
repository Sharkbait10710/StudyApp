import * as React           from 'react';
import FormEntry            from './FormEntry'
import AddCircleIcon        from '@mui/icons-material/AddCircle'
import LabelImportantIcon   from '@mui/icons-material/LabelImportant'
import { 
    Grid,
    Button,
    IconButton
} from '@mui/material';

class Form extends React.Component {
    render() {
        return (
            <Grid
                container
                sx={{
                    zIndex: 1,

                    bgColor: 'red',
                    textAlign: 'center',

                    position: 'absolute',
                    left: "10%",
                    top: "5%",

                    height: "90vh",
                    width: "80%",

                    border: 3,
                    borderColor: '#e0dbce',
                    borderRadius: '15px'
                }}>
                <Grid
                    item
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        boxShadow: "0 0 0 max(100vh, 100vw) rgba(0, 0, 0, .1)",
                        
                        width: "100%",
                        height: "100%",
                        textAlign: "center",

                        bgcolor: "white",

                        borderRadius: '15px'
                    }}>
                    <Grid
                        item
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            boxShadow: "0 0 0 max(100vh, 100vw) rgba(0, 0, 0, .6)",
                            
                            width: "100%",
                            height: "100%",
                            textAlign: "center",

                            bgcolor: "white",

                            borderRadius: '15px',

                            overflowY: "scroll",
                            overflowX: "hidden"
                        }}>
                        {
                        Object.keys(this.props.data).map((ele) => {
                            return (
                                <FormEntry 
                                    key={"form " + String(ele)} 
                                    id={String(ele)} 
                                    question={this.props.data[ele]["question"]} 
                                    answer={this.props.data[ele]["answer"]}
                                    type={this.props.data[ele]["type"]}
                                    Latex={this.props.data[ele]["Latex"]}/>
                            )
                        })}
                        <Grid
                            item
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: "95%",
                                height: "10vh",

                                border: 3,
                                borderStyle: 'dotted',
                                borderRadius: '20px',
                                borderColor: '#e0dbce'
                            }}>
                            <IconButton
                                onClick={() => this.props.addFormEntry()}
                                sx = {{
                                    transform: "scale(1.7)",
                                    color: "#fa5f2f"
                                }}>
                                <AddCircleIcon/>
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>
                <Button 
                    onClick={() => this.props.commitActivity()}
                    variant="contained" 
                    endIcon={<LabelImportantIcon />}
                    sx={{
                        position: 'absolute',
                        bottom: '-5%',
                        right: '0%',
                        backgroundColor: '#fff',
                        color: '#fa5f2f',

                        '&:hover': {
                            backgroundColor: '#fa5f2f',
                            color: '#e0dbce',
                        },
                    }}>
                    Commit
                </Button>
            </Grid>
        )}
}

export default Form;