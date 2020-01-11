import "./App.css";
import React from "react";
import {BrowserRouter} from "react-router-dom";

import {MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

import VotingForm from "./components/VotingForm/Main";

import {
  DONATION_ADDRESS,
  PROVINCES,
  CANDIDATE_NAME,
  HAPPINESS_LABEL
} from "./constants";


const NETWORK = "goerli";

export default function App() {
  return (
    <BrowserRouter>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <div className="App">
          <div className="App-Content">
            <Solution />
          </div>
        </div>
      </MuiPickersUtilsProvider>
    </BrowserRouter>
  );
}

function Solution() {
  return (
      <VotingForm />
  )
}







