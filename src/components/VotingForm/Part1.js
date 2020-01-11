import React from "react";
import {useHistory} from "react-router-dom";

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box'
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import Divider from "@material-ui/core/Divider";

import {CANDIDATE_NAME, HAPPINESS_LABEL} from "../../constants";

function VotingFormPart1({ user, candidate, setCandidate, happiness, setHappiness }) {
    const history = useHistory();

    function onClickNext(e) {
        e.preventDefault();
        console.log(candidate, happiness);
        history.push("/voting/2");
    }

    return (
        <div>
            <Grid container={true}>
                <Typography variant="h3" gutterBottom={true}>
                    Part 1:
                </Typography>
                <Box m={3} />
                <Typography variant="h6" gutterBottom={true}>
                    Who is your favourite candidate?
                </Typography>
                <FormControl component="fieldset">
                    <RadioGroup
                        aria-label="candidate"
                        value={candidate}
                        onChange={e => setCandidate(e.target.value)}
                    >
                        {Object.entries(CANDIDATE_NAME).map(([id, name]) => (
                            <FormControlLabel
                                value={id}
                                key={id}
                                control={<Radio />}
                                label={name}
                            />
                        ))}
                    </RadioGroup>
                </FormControl>
                <Box m={3} />
                <Typography variant="h6" gutterBottom={true}>
                    How happy are you with the current progress?
                </Typography>
                <FormControl component="fieldset">
                    <RadioGroup
                        aria-label="happiness"
                        value={happiness}
                        onChange={e => setHappiness(e.target.value)}
                    >
                        {Object.entries(HAPPINESS_LABEL).map(([id, label]) => (
                            <FormControlLabel
                                value={id}
                                key={id}
                                control={<Radio />}
                                label={label}
                            />
                        ))}
                    </RadioGroup>
                </FormControl>
            </Grid>
            <Box m={3} />
            <Divider />
            <Box m={3} />
            <Grid container={true} justify="space-between">
                <Button variant="contained" disabled>
                    Previous
                </Button>
                <Button
                    variant="contained"
                    onClick={onClickNext}
                    disabled={!candidate || !happiness}
                    color="primary"
                >
                    Next
                </Button>
            </Grid>
        </div>
    );
}

export default  VotingFormPart1;