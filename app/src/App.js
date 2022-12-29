import React, { useEffect, useState } from 'react';

function App() {
  // Constants
  const serverUrl = 'http://localhost:3001';

  // Utility functions
  const readfromStream = (response) => {
    const reader = response.body.getReader();
    return new ReadableStream({
      start(controller) {
        return pump();
        function pump() {
          return reader.read().then(({ done, value }) => {
            // When no more data needs to be consumed, close the stream
            if (done) {
              controller.close();
              return;
            } else {
              console.log(String.fromCharCode.apply(null, value));
            }
            // Enqueue the next data chunk into our target stream
            controller.enqueue(value);
            return pump();
          });
        }
      }
    })
  };

  //Initialize backend
  useEffect(() => {
  fetch(serverUrl)
  .then((response) => {
    readfromStream(response);
  })}, []);

  // States
  const [userInput, setuserInput] = useState(() => {
    return "";
  });
  
  useEffect(() => {
    document.getElementById("output").setHTML(userInput);
  });

  // Functions
  const handlebuttonClick = () => {
    fetch(serverUrl, {
      method: "POST",
      body: JSON.stringify({
        "test": "1"
     }),
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    })
    .then((response) => {
      readfromStream(response);
    })
  };

  return(
    <div id="app">
      <p id="output"></p>
      <p><input id="userInput" onInput={() => setuserInput(document.getElementById("userInput").value)}/></p>
      <button id ="Button" onClick={() => handlebuttonClick()}>Press Me</button>
    </div>
  ); 
}

export default App;
