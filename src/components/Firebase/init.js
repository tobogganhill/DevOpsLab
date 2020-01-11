import * as firebase from 'firebase/app';
import 'firebase/firestore';
import firebaseConfig from "./config";


// Initialize Firebase
firebase.initializeApp(firebaseConfig)

// Firestore Reference
export const firestoreDB = firebase.firestore();


// candidates
export function DBVoteCandidate(docPath, nameValue) {
    let colPath = 'candidates';
    DBIncrVoteCounter(colPath,docPath, nameValue);
}

// resideProvince
export function DBVoteResideProvince(docPath, nameValue) {
    let colPath = 'resideProvince';
    DBIncrVoteCounter(colPath,docPath, nameValue);
}

// happiness
export function DBVoteHappiness(docPath, nameValue) {
    let colPath = 'happiness';
    DBIncrVoteCounter(colPath,docPath, nameValue);
}

// temperature
export function DBVoteTemperature(docPath, nameValue) {
    let colPath = 'temperature';
    DBIncrVoteCounter(colPath,docPath, nameValue);
}

// birthDates
export function DBVoteBirthDates(docPath, nameValue) {
    let colPath = 'birthDates';
    DBIncrVoteCounter(colPath,docPath, nameValue);
}

function DBIncrVoteCounter(colPath, docPath, nameValue) {
    const docRef = firestoreDB.collection(colPath).doc(docPath.toString());

    docRef.update({
        votes: firebase.firestore.FieldValue.increment(1),
    })
    .catch(function(error) {
        const docData = {
            name: nameValue,
            votes: 1,
        };
        firestoreDB.collection(colPath)
            .doc(docPath.toString())
            .set(docData)
    })
}
