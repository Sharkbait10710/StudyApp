const express = require("express");
const cors = require('cors');
const body_parser = require('body-parser');

const PORT = process.env.PORT || 3001;
const app = express();

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

app.use(cors());
app.use(body_parser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.end("Initialize");
});

app.post('/', function requestHandler(req, res) {
  res.end(JSON.stringify(req.body));
  console.log(JSON.stringify(req.body));
});