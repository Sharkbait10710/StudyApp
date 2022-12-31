const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require("fs");

const PORT = process.env.PORT || 3001;
const app = express();

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

app.use(cors());
// create application/json parser
var jsonParser = bodyParser.json()

const defaultData = {
  "size": 0
};

app.get('/database/:reqType', (req, res) => {
  fs.readFile("database/database.json", function(err, data) {
    if (err) {
      if (!fs.existsSync('./database')) {
        fs.mkdirSync('./database');
      }
      writeJSON("database/database.json", defaultData);
      res.end(JSON.stringify(defaultData));
    } else {
      switch(req.params["reqType"]) {
        case "names": {
          res.end(JSONextract(data, accessJSONele, "names"));
          break;
        };
        default: {
          console.log("default");
          break;
        };
      }
    }
  });
});

app.post('/database/:reqType', jsonParser, function requestHandler(req, res) {
  // console.log(req);
  const write = () => {
    switch(req.params["reqType"]) {
      case "new": {
        console.log(JSON.stringify(req.body));
        break;
      }
      default: {
        console.log("default");
        break;
      }
    }
  };

  if (!fs.existsSync('./database')) {
    ((callback) => {
      fs.mkdirSync('./database');
      callback();
    })(write);
  } else {
    write();
  }
  // fs.writeFile("database/database.json", JSON.stringify(JSON.stringify(req.body)), err => {
  //   if (err) throw err; 
  //   console.log("Done writing");
  // });
});


// =====  Helper Functions =====  //
const writeJSON = (fileName, jsonObj) => {
  fs.writeFile(fileName, JSON.stringify(jsonObj), err => {
    if (err) throw err; 
  });
}

const buffertoStr = (buffer) => {
  return String.fromCharCode.apply(null, buffer);
}

const JSONextract = (buffer, func, ...args) => {
  // Assumption is that func will return a json object
  return JSON.stringify(func(JSON.parse(buffertoStr(buffer)), ...args));
}

const accessJSONele = (JSONobj, ele) => {
  let retVal = JSONobj[ele] == undefined ? null : JSONobj[ele];
  return {
    "return": retVal
  }
}