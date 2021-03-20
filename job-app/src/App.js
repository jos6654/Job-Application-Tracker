
import './App.css';
import React from 'react';
import { Card, Button, Container } from 'react-bootstrap';
import { PencilSquare } from 'react-bootstrap-icons';

import 'bootstrap/dist/css/bootstrap.min.css';

import Popup from './components/popup/Popup.js';
import Sidebar from './components/sidebar/Sidebar.js';
import Visualization from './components/visualization/Visualization.js';
import { options } from './constants.js';

class App extends React.Component {

    constructor() {
        super();
        this.state = {
            applications: [],
            popupOpenAdd: false,
            popupOpenUpdate: false,
            cardToUpdate: null,
            allTags: [],
            filteredTags: [],
            exportVisualization: false
        };
        this.addCard = this.addCard.bind(this);
        this.cancel = this.cancel.bind(this);
        this.save = this.save.bind(this);
        this.removeCard = this.removeCard.bind(this);
        this.updateCard = this.updateCard.bind(this);
        this.findTags = this.findTags.bind(this);
        this.setFilteredTags = this.setFilteredTags.bind(this);
        this.removeTag = this.removeTag.bind(this);
        this.formatVisualization = this.formatVisualization.bind(this);
    }

    findTags() {
        const foundTags = [];
        this.state.applications.forEach((appl) => {
            appl.Categories.forEach((tag) => {
                if (!(foundTags.includes(tag))) {
                    foundTags.push(tag);
                }
            });
        });
        return foundTags;
    }

    setFilteredTags(filters) {
        this.setState({
            filteredTags: filters
        });
    }

    cards(filter=null, tags=null) {
        const cards = [];
        this.state.applications.forEach((appl) => {
            if (filter === null || appl.Status === filter) {
                var intersection = [];
                if (tags !== null) {
                    intersection = appl.Categories.filter(tag => tags.includes(tag));
                }
                if (tags === null || intersection.length > 0) {
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
                                    <br></br>
                                    {appl.Categories.length > 0 ? appl.Categories.map(cat => {return <div><b className="single-tag">{cat}</b></div>;}) : ""}
                                </Card.Body>
                            </Card>
                        </div>
                    );
                }
            }
        });
        return cards;
    }

    formatVisualization() {
        var layers = [0, 0, 0, 0, 0];
        var formattedData = "";
        console.log("I'm was called")
        this.state.applications.forEach((card) => {
            switch(card.Status) {
                case "Applied":
                    layers[0] += 1;
                    break;
                case "Interviewing":
                    layers[0] += 1;
                    layers[1] += 1;
                    break;
                case "Denied":
                    layers[0] += 1;
                    layers[1] += 1;
                    layers[2] += 1;
                    break;
                case "Offered":
                    layers[0] += 1;
                    layers[1] += 1;
                    layers[3] += 1;
                    break;
                case "Accepted":
                    layers[0] += 1;
                    layers[1] += 1;
                    layers[3] += 1;
                    layers[4] += 1;
                    break;
                default:
                    console.log("Error: status not recognized")
                    break;
            }
        });
        formattedData = "Applied [" + (layers[0] - layers[1]) + "] Rejected/No Response\n" + 
                        "Applied [" + layers[1] + "] Interview\n" +
                        "Interview [" + layers[2] + "] Denied\n" +
                        "Interview [" + layers[3] + "] Offered\n" +
                        "Offered [" + (layers[3] - layers[4]) + "] Turned Down\n" +
                        "Offered [" + (layers[4]) + "] Accepted";
        return formattedData;
    }

    categories() {
        const categories = [];
        options.forEach((option) => {
            categories.push(
                <div className="full-category" key={option}>
                    <div className="category-title">{option}</div>
                    <div className="category-container">
                        {this.cards(option, this.state.filteredTags)}
                    </div>
                </div>
            );
        });
        return categories;
    }

    addCard(card) {
        const filteredTags = this.state.filteredTags;
        const allTags = this.state.allTags;
        this.state.applications.push(card);
        card.Categories.forEach((category) => {
            if (!(allTags.includes(category))) {
                allTags.push(category);
            }
            if (!(filteredTags.includes(category))) {
                filteredTags.push(category);
            }
        });
        this.setState({ 
            popupOpenAdd: false
        }, () => {
            this.save();   
        });
    }

    cancel() {
        this.setState({
            popupOpenAdd: false,
            popupOpenUpdate: false,
            cardToUpdate: null,
            exportVisualization: false
        });
    }

    updateCard(card) {
        var index = this.state.applications.findIndex(app => app.ApplicationID === card.ApplicationID);
        this.state.applications[index] = card;
        this.setState({ 
            popupOpenUpdate: false,
            cardToUpdate: null,
            allTags: this.findTags()
        }, () => {
            this.save();
        });
    }

    removeTag(tag) {
        const callback = t => t === tag;
        const allTagsIndex = this.state.allTags.findIndex(callback);
        const filteredTagsIndex = this.state.filteredTags.findIndex(callback);
        if (allTagsIndex > -1) {
            this.state.allTags.splice(allTagsIndex, 1);
        }
        if (filteredTagsIndex > -1) {
            this.state.filteredTags.splice(filteredTagsIndex, 1);
        }
    }

    removeCard(appId) {
        var currApplications = this.state.applications;
        var index = currApplications.findIndex(app => app.ApplicationID === appId);
        if (index > -1) {
            currApplications.splice(index, 1);
        }
        this.setState({
            applications: currApplications,
            allTags: this.findTags()
        }, () => {
            this.save();
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
            }, () => {
                this.setState({
                    allTags: this.findTags(),
                    filteredTags: this.findTags()
                });
            });
        });
    }

    render() {
        return (
            <React.Fragment>
                <div className="App">
                    <header className="App-header">
                        <h1>Job Application Dashboard</h1>
                    </header>
                    <div className="App-body">
                        <Container className="main">
                            {this.categories()}
                        </Container>
                        <div className="options">
                            <Button variant="primary" className="btn-primary" onClick={() => { this.setState({popupOpenAdd: true}); }}>+ New Application</Button> {' '}
                            <br />
                            <br />
                            <Button variant="info" className="btn-primary" onClick={() => { this.setState({exportVisualization: true}); }}>Export for Visualization</Button> {' '}
                            {/*<Button variant="primary" className="btn-primary" onClick={() => {this.save()}}>Save</Button> {' '}*/}
                            <h2>Filter Tags</h2>
                            <Sidebar checklist={this.state.allTags} callback={this.setFilteredTags}></Sidebar>
                        </div>
                    </div>
                </div>
                {this.state.popupOpenAdd && <Popup addCard={this.addCard} cancel={this.cancel} appliedDate={new Date()} interviewDate={""}></Popup>}
                {this.state.popupOpenUpdate && <Popup updateCard={this.updateCard} cancel={this.cancel} cardToUpdate={this.state.cardToUpdate} 
                    appliedDate={this.state.cardToUpdate.AppliedDate} interviewDate={this.state.cardToUpdate.InterviewDate}></Popup>}
                {this.state.exportVisualization && <Visualization close={this.cancel} data={this.formatVisualization()}></Visualization>}
            </React.Fragment>
        );
    }
}

export default App;
