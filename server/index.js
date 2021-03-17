const express = require("express");
const PORT = 3001;
const app = express();
// Node File Stream object
const fs = require('fs');


app.use(express.json());
const schedule = require('node-schedule');
var job = schedule.scheduleJob('0 12 * * 0', function() {
// Email schedulder
    ReadJson('exampleJson.json').then((result) => {
        var applications = result;
        for (i=0; i< applications.length; i++) {
            if (applications[i]["InterviewDate"]) {
                SendEmailReminder(applications[i]);
            }
        }
    });
});

function SendEmailReminder(application) {
    const UserEmail = "peg3268@rit.edu";
    const JobTrackerEmail = "swen356jobtracker@gmail.com";
    const JobTrackerPass = "JobTrackerSquad";
    var nodemailer = require('nodemailer');

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: JobTrackerEmail,
            pass: JobTrackerPass
        }
    });
    var mailOptions = {
        from: JobTrackerEmail,
        to: UserEmail,
        subject: "Interview Reminder: " + application["CompanyName"],
        html: `<h1>Upcoming Interview!</h1><br><p>${application["CompanyName"]} Interview: ${application["InterviewDate"]}</p>`
    }
    transporter.sendMail(mailOptions, function(err, info){
        if (err) {
            console.log("Error:" + err)
        } else {
            console.log('Email Sent: ' + info.response);
        }
    });
}


// Reading and the get actions for the API
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


// Posting and the writing actions
app.post('/save', (req, res) => {
    const body = req.body;
    //WriteJson(body);
    console.log("Received Json data:");
    console.log(body);
    WriteJson(body);
    res.send('Received Json Data.')
});

function WriteJson(jsonData) {
    var jsonID = 'exampleJson.json';
    jsonString = JSON.stringify(jsonData, null, 4);
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
