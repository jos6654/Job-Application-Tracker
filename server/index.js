const express = require("express");
const PORT = 3001;
const app = express();
// Node File Stream object
const fs = require('fs');

async function ReadJson(jsonID) {
    const data = await fs.promises.readFile('./server/storage/' + jsonID, 'utf8');
    jsonData = JSON.parse(data);
    return jsonData;
}

app.get("/applications", (req, res) => {
    ReadJson('exampleJson.json').then((result) => {
        res.json(result);
    });
});

app.post('/save', (req, res) => {
    const body = req.query;
    WriteJson(body);
    console.log(body);
    res.set('Content-Type', 'text/plain');
    res.send('Received Json Data.')
});

function WriteJson(jsonData) {
    var jsonID = 'exampleJson.json';
    jsonString = JSON.stringify(jsonData);
    fs.writeFile('./server/storage/' + jsonID, jsonString, err => {
        if (err) {
            console.log('Error writing applications to file: ' + err);
        } else {
            console.log('Applications Saved to ${jsonID}.json');
        }
    })
}

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
