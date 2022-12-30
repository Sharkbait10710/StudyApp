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
  fs.readFile("data.json", function(err, data) {
      
    // Check for errors
    if (err) throw err;
   
    // Converting to JSON
    const users = JSON.parse(data);
      
    res.end(users);
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