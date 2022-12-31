const express = require("express");
const cors = require('cors');
const body_parser = require('body-parser');
const fs = require("fs");

const PORT = process.env.PORT || 3001;
const app = express();

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

app.use(cors());
app.use(body_parser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  fs.readFile("metadata.json", function(err, data) {
    if (err) {
      res.end("metadata.json doesn't exist");
      writeJSON("metadata.json", {
        "empty": true
      });
    } else {
      res.end(String.fromCharCode.apply(null, data));
    }
  });
});

app.post('/', function requestHandler(req, res) {
  res.end(JSON.stringify(req.body));
  console.log(JSON.stringify(req.body));
  fs.writeFile("data.json", JSON.stringify(JSON.stringify(req.body)), err => {
    if (err) throw err; 
    console.log("Done writing");
  });
});


// =====  Helper Functions =====  //
const writeJSON = (fileName, jsonObj) => {
  console.log(jsonObj);
  fs.writeFile(fileName, JSON.stringify(jsonObj), err => {
    if (err) throw err; 
    console.log("Done writing");
  });
}