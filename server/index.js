const express = require("express");
const PORT = 3001;
const app = express();
// Node File Stream object
const fs = require('fs');

// Dictionary declaration for application items
applications = [];

async function ReadJson(jsonID) {
    const data = await fs.promises.readFile('./server/storage/' + jsonID, 'utf8');
    jsonData = JSON.parse(data);
    return jsonData;
}

ReadJson('exampleJson.json').then(function(result) {
    app.get("/applications", (req, res) => {
      res.json(result);
    });
});

//applications[1]["Salary"] = "$55/hour";
//console.log(applications);
//WriteJson('exampleJson.json');

function WriteJson(jsonID) {
    jsonString = JSON.stringify(applications);
    fs.writeFile('./server/storage/' + jsonID, jsonString, err => {
        if (err) {
            console.log('Error writing applications to file: ' + err);
        } else {
            console.log('Applications Saved to ${jsonID}.json');
        }
    })
}



app.get("/")

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
