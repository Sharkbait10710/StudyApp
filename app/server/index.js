const express = require("express");

const PORT = process.env.PORT || 3001;
const serverUrl = 'http://localhost:' + PORT;
const app = express();

let num = 0; 

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/', (req, res) => {
  res.send("something");
});