import {
  React, 
  useEffect, 
  useState 
} from 'react';

import { 
  readfromStream,
  stateinitVal
} from './Utility';

import {
  makePost 
} from './apiFunctions';

import Latex from 'react-latex-next'

const serverUrl = "http://localhost:3001";

const setup = () => {
  fetch(serverUrl)
  .then((response) => {
    readfromStream(response);
  });
}

function App() {
  // =====  States  ===== //
  const [userInput, setuserInput] = useState(stateinitVal(""));
  
  useEffect(() => {
    document.getElementById("output").setHTML(userInput);
  });

  // =====  Init    ===== //
  setup();

  // =====  Fronend ===== //
  return(
    <div id="app">
      <p id="output"></p>
      <p><input id="userInput" onInput={() => setuserInput(document.getElementById("userInput").value)}/></p>
      <button id ="Button" onClick={() => makePost(serverUrl, {"test": "1"})}>Press Me</button>
      <Latex>We give illustrations for the three processes $e^+e^-$, gluon-gluon and $\\gamma\\gamma \\to W t\\bar b$.</Latex>
    </div>
  ); 
}

export default App;
