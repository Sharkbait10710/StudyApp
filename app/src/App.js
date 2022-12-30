import {
  React
} from 'react';

import { 
  readfromStream
} from './utils/utility';


import {
  BrowserRouter as Router, Routes, Route
} from 'react-router-dom'

import Home from './pages/Home'

// var Latex = require("react-latex");

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
    </div>
  ); 
}

export default App;
