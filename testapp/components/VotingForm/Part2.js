import React from "react";
import {useHistory} from "react-router-dom";

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box'
import Grid from "@material-ui/core/Grid";
import {KeyboardDatePicker} from "@material-ui/pickers";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Divider from "@material-ui/core/Divider";

import {PROVINCES} from "../../constants";

function VotingFormPart2({ date, setDate, province, setProvince }) {
    const history = useHistory();

    function onClickNext(e) {
        e.preventDefault();
        console.log(date, province);
        history.push("/voting/3");
    }

    return (
        <div>
            <Grid>
                <Typography variant="h3" gutterBottom={true}>
                    Part 2:
                </Typography>
                <Box m={3} />
                <Typography variant="h6" gutterBottom={true}>
                    When is your birthday?
                </Typography>
                <KeyboardDatePicker
                    format="MM/dd/yyyy"
                    value={date}
                    onChange={date => setDate(date)}
                />

                <Box m={3} />
                <Typography variant="h6" gutterBottom={true}>
                    Which province do you reside in?
                </Typography>
                <Select
                    id="province"
                    value={province}
                    onChange={e => setProvince(e.target.value)}
                    fullWidth
                    variant="outlined"
                >
                    {PROVINCES.map(province => (
                        <MenuItem key={province.code} value={province.code}>
                            {province.name}
                        </MenuItem>
                    ))}
                </Select>
            </Grid>
            <Box m={3} />
            <Divider />
            <Box m={3} />
            <Grid container={true} justify="space-between">
                <Button variant="contained" onClick={e => history.goBack()}>
                    Previous
                </Button>
                <Button
                    variant="contained"
                    onClick={onClickNext}
                    disabled={!date || !province}
                    color="primary"
                >
                    Next
                </Button>
            </Grid>
        </div>
    );
}

export default  VotingFormPart2;