import {
  React, 
  useEffect, 
  useState 
} from 'react';

import { 
  readfromStream,
  stateinitVal
} from './utils/utility';


import {
  BrowserRouter as Router, Routes, Route
} from 'react-router-dom'

import Home from './pages/Home'

var Latex = require("react-latex");

const serverUrl = "http://localhost:3001";

const setup = () => {
  fetch(serverUrl)
  .then((response) => {
    readfromStream(response);
  });
}

function App() {
  // =====  Init    ===== //
  setup();

  // =====  Fronend ===== //
  return(
    <div id="app">
      <Router>
        <Routes>
          <Route path= "/" element={<Home />}/>
        </Routes>
      </Router>
      {/* <p id="output"></p>
      <p><input id="userInput" onInput={() => setuserInput(document.getElementById("userInput").value)}/></p>
      <button id ="Button" onClick={() => makePost(serverUrl, {"test": "1"})}>Press Me</button>
      <Latex>{'$$\\frac{1}{2}$$'}</Latex> */}
    </div>
  ); 
}

export default App;
