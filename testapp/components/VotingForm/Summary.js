import React from "react";
import {useHistory} from "react-router-dom";

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box'
import Grid from "@material-ui/core/Grid";
import DoneAllIcon from "@material-ui/icons/DoneAll";


import {DONATION_ADDRESS} from "../../constants";
import {
    GetCandidateName,
    GetProvinceName,
    GetHappinessName,
    ConvertToFirestoreDateFormat,
    FormatBirthDate
} from "./Utilities"

import TxDispatch from "../Ethereum/TxDispatch";
import {
    DBVoteBirthDates,
    DBVoteCandidate,
    DBVoteHappiness,
    DBVoteResideProvince,
    DBVoteTemperature
} from "../Firebase/init";


function VotingFormSummary({ setUser, candidate, happiness, date, province, temp }) {
    const history = useHistory();

    const [donate2Candidate,setDonate2Candidate] = React.useState();
    const [donate2Charity,setDonate2Charity] = React.useState();

    const DonateEthereum = async () => {
        await TxDispatch({
            fromAddress: '0x3Cc7ffD56848bF74cCa9b33dE616191A3a941804',
            toAddress: '0xFCCe432a0d121CaA31fA8a4a5485C05058AA5489',
            valueInEth: donate2Candidate,
            gas: 4200000,
            message: 'donateMessage',
        });
        await TxDispatch({
            fromAddress: '0x3Cc7ffD56848bF74cCa9b33dE616191A3a941804',
            toAddress: DONATION_ADDRESS,
            valueInEth: donate2Candidate,
            gas: 4200000,
            message: 'donateMessage',
        });
    };

    const onVote = (e) => {

        // Normalize BirthDate
        const birthDateString = ConvertToFirestoreDateFormat(date);

        DBVoteCandidate(candidate,candidate)
        DBVoteResideProvince(province,province);
        DBVoteHappiness(happiness,happiness);
        DBVoteTemperature(temp,temp + '°C');
        DBVoteBirthDates(birthDateString,birthDateString)

        // Perform Eth Transaction
        DonateEthereum();

        // Navigate to Results Page
        history.push("/results");

    };


    return (
        <div>
            <Grid>
                <Typography component="h3" variant="h3">
                    Summary
                </Typography>

                <Box m={3} />
                <Typography component="h6">Who is your favourite candidate?</Typography>
                <Typography variant="h6" color="primary">
                    {GetCandidateName(candidate)}
                </Typography>

                <Box m={3} />
                <Typography component="h6">
                    How happy are you with the current progress?
                </Typography>
                <Typography variant="h6" color="primary">
                    {GetHappinessName(happiness)}
                </Typography>
                <Box m={3} />

                <Typography component="h6">When is your birthday?</Typography>
                <Typography variant="h6" color="primary">
                    {FormatBirthDate(date)}
                </Typography>

                <Box m={3} />

                <Typography component="h6">Which province do you reside in?</Typography>
                <Typography variant="h6" color="primary">
                    {GetProvinceName(province)}
                </Typography>

                <Box m={3} />

                <Typography component="h6">What is your ideal room temperature?</Typography>
                <Typography variant="h6" color="primary">
                    {temp}°C
                </Typography>
            </Grid>
            <Box m={3} />
            <Grid container={true} direction="column">
                <TextField
                    id="outlined-basic"
                    label="Donate ETH to your candidate (optional)"
                    variant="outlined" defaultValue={donate2Candidate}
                    onChange={event => setDonate2Candidate(event.target.value)}
                />
            </Grid>
            <Box m={3} />
            <Grid container={true} direction="column">
                <TextField
                    id="outlined-basic"
                    label="Donate ETH to charity (optional)"
                    variant="outlined" defaultValue={donate2Charity}
                    onChange={event => setDonate2Charity(event.target.value)}
                />
            </Grid>
            <Box m={3} />
            <Grid justify="center" container={true}>
                <Button variant="contained" color="primary" onClick={onVote}>
                    <DoneAllIcon /> Cast Vote
                </Button>
            </Grid>
            <Grid justify="center" container={true}>
                <Button
                    variant="contained"
                    onClick={e => {
                        e.preventDefault();
                        history.push("/voting/3");
                    }}
                >
                    Back
                </Button>
            </Grid>
        </div>
    );
}

export default  VotingFormSummary;