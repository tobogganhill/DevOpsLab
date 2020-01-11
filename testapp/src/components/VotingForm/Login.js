import React from "react";
import {useHistory} from "react-router-dom";

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

function VotingFormLogin({ user, setUser, savedUsername, setSavedUsername}) {

    const history = useHistory();

    function onClickNext(e) {
        e.preventDefault();
        setSavedUsername(user);

        window.localStorage.setItem("user", user);
        console.log(user);
        history.push("/voting/1");
    }

    return (
        <div>
            <Grid container={true} justify="space-between">
                <Typography variant="h5" gutterBottom={true}>
                    To begin your voting application, choose an username:
                </Typography>
                <div>
                    <TextField
                        id="outlined-username"
                        label="Username"
                        margin="normal"
                        variant="outlined"
                        value={user}
                        onChange={event => setUser(event.target.value)}
                    />
                    <Box m={3} />

                    <Button
                        variant="contained"
                        onClick={onClickNext}
                        disabled={!user}
                        color="primary"
                    >
                        continue
                    </Button>
                </div>
            </Grid>
        </div>
    );
}

export default  VotingFormLogin;
