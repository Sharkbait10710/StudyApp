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
      console.log(JSON.stringify({
        "return": JSON.parse(buffertoStr(data))
      }));
      res.end(JSON.stringify({
        "return": JSON.parse(buffertoStr(data))
      }));
    }
  });
});

app.post('/database/:reqType', jsonParser, function requestHandler(req, res) {
  const write = () => {
    switch(req.params["reqType"]) {
      case "new": {
        fs.readFile("database/database.json", (err, data) => {
          if (err) throw err;
          fileData = JSON.parse(buffertoStr(data));
          if (fileData["names"] == undefined) {
            fileData["size"] = 1;
            fileData["names"] = [
              req.body["name"]
            ];
            fileData[req.body["name"]] = req.body["body"];
            writeJSON("database/database.json", fileData);
          } else {
            if (fileData[req.body["name"]] == undefined) {
              fileData["size"] += 1;
              fileData["names"].push(req.body["name"]);
              fileData[req.body["name"]] = req.body["body"];
            }
          }
        })
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