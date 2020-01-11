import React from "react";
import {useHistory} from "react-router-dom";

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box'
import Slider from "@material-ui/core/Slider";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";


function VotingFormPart3({ temp, setTemp }) {

    const onChangeTemp = (event, newValue) => {
        setTemp(newValue);
    };
    const marks = [
        {
            value: 0,
            label: "0°C"
        },
        {
            value: 20,
            label: "20°C"
        },
        {
            value: 37,
            label: "37°C"
        },
        {
            value: 100,
            label: "100°C"
        }
    ];

    const history = useHistory();

    function onClickNext(e) {
        e.preventDefault();
        console.log(temp);
        history.push("/voting/summary");
    }

    return (
        <div>
            <Typography variant="h3" component="h3">
                Part 3
            </Typography>
            <Typography variant="h5" component="h5">
                What is your ideal room temperature?
            </Typography>
            <Box m={3} />
            <Slider
                defaultValue={20}
                aria-labelledby="discrete-slider-always"
                step={1}
                marks={marks}
                valueLabelDisplay="on"
                onChange={onChangeTemp}
            ></Slider>
            <Divider />
            <Box m={3} />
            <Grid container={true} justify="space-between">
                <Button variant="contained" onClick={() => history.goBack()}>
                    Previous
                </Button>
                <Button variant="contained" onClick={onClickNext} color="primary">
                    Next
                </Button>
            </Grid>
        </div>
    );
}

export default  VotingFormPart3;