import React  from "react";
import {
    Switch,
    Route,
    Redirect,
    Link as RouterLink,
    useLocation
} from 'react-router-dom'
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";

import VotingFormLogin from "./Login";
import VotingFormPart1 from "./Part1";
import VotingFormPart2 from "./Part2";
import VotingFormPart3 from "./Part3";
import VotingFormSummary from "./Summary";
import VotingFormResults from "./Results";


export function VotingForm() {

    const [user, setUser] = React.useState("");
    const [savedUsername, setSavedUsername] = React.useState(
        window.localStorage.getItem("user" || "")
    );

    const [candidate, setCandidate] = React.useState("");
    const [happiness, setHappiness] = React.useState("");
    const [date, setDate] = React.useState(new Date());
    const [province, setProvince] = React.useState("");
    const [temp, setTemp] = React.useState("20");
    const location = useLocation();

    React.useEffect(() => {
        if (savedUsername) {
            window.localStorage.setItem('user', savedUsername)
        } else {
            window.localStorage.removeItem('user')
        }
    }, [savedUsername])

    return (
        <div>
            <Grid container={true} justify="space-between">
                <Typography component="h1" gutterBottom={true}>
                    Cast Your Vote
                </Typography>

                {location.pathname === "/" ||
                location.pathname === "/voting/1" ||
                location.pathname === "/voting/summary" ||
                location.pathname === "/results" ? null : (
                    <Link to="/voting/1" component={RouterLink} variant="inherit">
                        Back to start
                    </Link>
                )}
                <Box m={3} />

                <Switch>
                    <Route exact={true} path="/">
                        {savedUsername ? <Redirect to='/voting/1' /> : undefined}
                        <VotingFormLogin
                            user={user}
                            setUser={setUser}
                            savedUsername={savedUsername}
                            setSavedUsername={setSavedUsername}
                        />
                    </Route>
                    <Route exact={true} path="/voting/1">
                        {!savedUsername ? <Redirect to='/' /> : undefined}
                        <VotingFormPart1
                            user={user}
                            candidate={candidate}
                            setCandidate={setCandidate}
                            happiness={happiness}
                            setHappiness={setHappiness}
                        />
                    </Route>
                    <Route exact={true} path="/voting/2">
                        {!savedUsername ? <Redirect to='/' /> : undefined}
                        <VotingFormPart2
                            date={date}
                            setDate={setDate}
                            province={province}
                            setProvince={setProvince}
                        />
                    </Route>
                    <Route exact={true} path="/voting/3">
                        {!savedUsername ? <Redirect to='/' /> : undefined}
                        <VotingFormPart3
                            temp={temp}
                            setTemp={setTemp}
                        />
                    </Route>
                    <Route exact={true} path="/voting/summary">
                        {!savedUsername ? <Redirect to='/' /> : undefined}
                        <VotingFormSummary
                            setUser={setUser}
                            candidate={candidate}
                            happiness={happiness}
                            date={date}
                            province={province}
                            temp={temp}
                        />
                    </Route>
                    <Route exact={true} path="/results">
                        {!savedUsername ? <Redirect to='/' /> : undefined}
                        <VotingFormResults />
                    </Route>
                </Switch>
            </Grid>
        </div>
    );
}

export default VotingForm;
