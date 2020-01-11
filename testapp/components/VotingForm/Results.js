import React from "react";

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box'
import Grid from "@material-ui/core/Grid";

import {firestoreDB} from "../Firebase/init";
import {CalculateAge} from "./Utilities";

export function VotingFormResults() {

    const [loading, setLoading] = React.useState(true);
    const [candidates,setCandidates] = React.useState([]);
    const [happiness,setHappiness] = React.useState([]);
    const [resideProvince,setResideProvince] = React.useState([]);
    const [temperature,setTemperature] = React.useState([]);
    const [ageGroupStats,setAgeGroupStats] = React.useState([]);

    const GetDocs = (colPath,setMethod) => {
        firestoreDB.collection(colPath).where('votes', '>', 0).get().then((snapshot) => {
            const list = [];
            snapshot.docs.forEach(doc => {
                const {name, votes} = doc.data();
                list.push({
                    id: doc.id,
                    name: name,
                    votes: votes,
                })
            })

            setMethod(list);

            if (loading) {
                setLoading(false);
            }
        })
    };

    const GetAgeGroupStats = (colPath,setMethod) => {
        let ageGroupArray = [0, 0, 0, 0, 0]
        let docBirthdates = firestoreDB.collection('birthDates').onSnapshot(snapshot => {
            snapshot.docChanges().forEach(function(change) {
                let ageGroup = CalculateAge(change.doc.id)

                if (ageGroup <= 19) {
                    ageGroupArray[0] = ageGroupArray[0] + change.doc.data().votes
                    // console.log(ageGroupArray[0])
                } else if (ageGroup > 19 && ageGroup < 30) {
                    ageGroupArray[1] = ageGroupArray[1] + change.doc.data().votes
                    // console.log(ageGroupArray[1])
                } else if (ageGroup > 29 && ageGroup < 40) {
                    ageGroupArray[2] = ageGroupArray[2] + change.doc.data().votes
                    // console.log(ageGroupArray[2])
                } else if (ageGroup > 39 && ageGroup < 50) {
                    ageGroupArray[3] = ageGroupArray[3] + change.doc.data().votes
                    // console.log(ageGroupArray[3])
                } else if (ageGroup > 49) {
                    ageGroupArray[4] = ageGroupArray[4] + change.doc.data().votes
                    // console.log(ageGroupArray[4])
                }
            })
            setAgeGroupStats(ageGroupArray);

        })

    }

    React.useEffect(() => {
        GetDocs('candidates', setCandidates);
        GetDocs('happiness', setHappiness);
        GetDocs('resideProvince', setResideProvince);
        GetDocs('temperature', setTemperature);
        GetAgeGroupStats('birthDates',setAgeGroupStats)

    }, []);

    React.useEffect(() => {
        happiness.sort((a, b) => parseInt(a.id) - parseInt(b.id));
    },[happiness])

    React.useEffect(() => {
        temperature.sort((a, b) => parseInt(a.id) - parseInt(b.id));
    },[temperature])

    if (loading) {
        return null;
    }

    return (
        <Grid container={true} direction="column">
            <Typography component="h3" variant="h3">
                Results
            </Typography>
            <Box m={3} />
            <Typography component="h1">Favourite Candidate:</Typography>
            <Typography variant="h6" color="primary">
                <ul>
                    {candidates.map(item => (
                        <li key={item.id}>{item.name} : {item.votes}</li>
                    ))}
                </ul>
            </Typography>
            <Typography component="h1">Progress:</Typography>
            <Typography variant="h6" gutterBottom={true} color="primary">
                <ul>
                    {happiness.map(item => (
                        <li key={item.id}>{item.name} : {item.votes}</li>
                    ))}
                </ul>
            </Typography>
            <Typography component="h1" gutterBottom={true}>
                Age Group:
            </Typography>
            <Typography variant="h6" gutterBottom={true} color="primary">
                <ul>
                    <li>19 or less: {ageGroupStats[0]}</li>
                    <li>20 to 29: {ageGroupStats[1]}</li>
                    <li>30 to 39: {ageGroupStats[2]}</li>
                    <li>40 to 49: {ageGroupStats[3]}</li>
                    <li>50 or more: {ageGroupStats[4]}</li>

                </ul>
            </Typography>

            <Typography component="h1" gutterBottom={true}>
                Province
            </Typography>
            <Typography variant="h6" gutterBottom={true} color="primary">
                <ul>
                    {resideProvince.map(item => (
                        <li key={item.id}>{item.name} : {item.votes}</li>
                    ))}
                </ul>
            </Typography>

            <Typography component="h1" gutterBottom={true}>
                Room Temperature:
            </Typography>
            <Typography variant="h6" gutterBottom={true} color="primary">
                <ul>
                    {temperature.map(item => (
                        <li key={item.id}>{item.name} : {item.votes}</li>
                    ))}
                </ul>
            </Typography>
        </Grid>
    );
}

export default  VotingFormResults;