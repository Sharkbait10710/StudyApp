import {
    React, 
    useEffect, 
    useState 
  } from 'react';

import {
    makePost
 } from '../utils/api'
 
 import {
    stateinitVal
  } from '../utils/utility'

 const serverUrl = "http://localhost:3001";

const Home = () => {
    // =====  States  ===== //
    const [userInput, setuserInput] = useState(stateinitVal(""));
  
    useEffect(() => {
        document.getElementById("output").setHTML(userInput);
    });

    return (
        <div>
            <p id="output"></p>
            <p><input id="userInput" onInput={() => setuserInput(document.getElementById("userInput").value)}/></p>
            <button id ="Button" onClick={() => makePost(serverUrl, {"test": "1"})}>Press Me</button>
        </div>
    )
}

export default Home;