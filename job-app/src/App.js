
import './App.css';
import React from 'react';
import { Card, Button, Container } from 'react-bootstrap';
import { PencilSquare } from 'react-bootstrap-icons';

import 'bootstrap/dist/css/bootstrap.min.css';

import Popup from './components/popup/Popup.js';

const easyApp = {
    "ApplicationID": "GUID1",
    "Position": "Lead Software Breaker",
    "Salary": "$99/year",
    "CompanyName": "Tik Tok",
    "CompanyPhone": "(123) 456-7890",
    "CompanyAddress": "Rochester, NY 66666",
    "Categories": ["#Rochester"],
    "AppliedDate": "2/14/2021",
    "Description": "This is a big notes section. \n This is the next line of notes."
};

class App extends React.Component {

    constructor() {
        super();
        this.state = {
            applications: [],
            popupOpenAdd: false,
            popupOpenUpdate: false,
            cardToUpdate: null
        };
        this.addCard = this.addCard.bind(this);
        this.cancel = this.cancel.bind(this);
        this.save = this.save.bind(this);
        this.removeCard = this.removeCard.bind(this);
        this.updateCard = this.updateCard.bind(this);
    }

    cards() {
        const cards = [];
        console.log("cards() start")
        this.state.applications.forEach((appl) => {
            console.log("card:");
            console.log(appl);
            cards.push(
                <div key={appl.ApplicationID}>
                    <Card>
                        <Card.Body>
                            <div className="delete-div">
                                <Button variant="outline-secondary" size='sm'
                                    onClick={() => { this.setState({popupOpenUpdate: true, cardToUpdate: appl}); }}><PencilSquare/></Button> {' '}
                                <Button variant='danger' size='sm' onClick={() => {this.removeCard(appl.ApplicationID);}}>X</Button>{' '} 
                            </div>
                            <Card.Title>{appl.CompanyName}</Card.Title>
                            <div>{appl.Position}</div>
                            <div>{appl.Description}</div>
                            
                        </Card.Body>
                    </Card>
                </div>
            );
        });
        return cards;
    }

    addCard(card) {
        this.state.applications.push(card);
        this.setState({ 
            appCount: this.state.applications.length,
            popupOpenAdd: false
        });
    }

    cancel() {
        this.setState({
            popupOpenAdd: false,
            popupOpenUpdate: false,
            cardToUpdate: null
        });
    }

    updateCard(card) {
        var index = this.state.applications.findIndex(app => app.ApplicationID === card.ApplicationID);
        this.state.applications[index] = card;
        this.setState({ 
            popupOpenUpdate: false,
            cardToUpdate: null
        });
    }

    removeCard(appId) {
        var currApplications = this.state.applications;
        var index = currApplications.findIndex(app => app.ApplicationID === appId);
        if (index > -1) {
            currApplications.splice(index, 1);
        }
        
        this.setState({
            applications: currApplications,
        });
    }

    save() {
        const axios = require('axios');
        const res = axios.post('/save', JSON.stringify(this.state.applications), {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    componentDidMount() {
        console.log("App.js mounted");
        // API call to get 
        const axios = require('axios');
        axios.get('/applications').then((response) => {
            console.log(response);
            this.setState({
                applications: response.data
            });
        });
    }

    render() {
        console.log("popupOpenAdd? " + this.state.popupOpenAdd.toString());
        return (
            <React.Fragment>
                <div className="App">
                    <header className="App-header">
                        <h1>Job Application Dashboard</h1>
                    </header>
                    <div className="App-body">
                        <Container className="main">
                            <div className="untagged">
                                <h3>Untagged</h3>
                                {this.cards()}
                            </div>
                        </Container>
                        <div className="options">
                            <Button variant="primary" className="btn-primary" onClick={() => { this.setState({popupOpenAdd: true}); }}>+ New Application</Button> {' '}
                            {/*<Button variant="primary" className="btn-primary" onClick={() => {this.save()}}>Save</Button> {' '}*/}
                            <h2>Tags</h2>
                            <div>
                                <p>#preferred</p> {/* placeholder */}
                                <p>#backups</p>   {/* placeholder */}
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.popupOpenAdd && <Popup addCard={this.addCard} cancel={this.cancel} appliedDate={new Date()} interviewDate={new Date()}></Popup>}
                {this.state.popupOpenUpdate && <Popup updateCard={this.updateCard} cancel={this.cancel} cardToUpdate={this.state.cardToUpdate} 
                    appliedDate={this.state.cardToUpdate.AppliedDate} interviewDate={this.state.cardToUpdate.InterviewDate}></Popup>}
            </React.Fragment>
        );
    }
}

export default App;
