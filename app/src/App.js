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

function App() {
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
