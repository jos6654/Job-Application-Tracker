import './Popup.css';
import React from 'react';

import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import {v4 as uuidv4} from 'uuid';
import { Modal, Form } from 'react-bootstrap';

import { options } from '../../constants';

class Popup extends React.Component {

    constructor(props) {
        super();
        this.state = {
            addCard: props.addCard,
            cancel: props.cancel,
            interviewDate: props.interviewDate,
            appliedDate: props.appliedDate,
            updateCard: props.updateCard,
            cardToUpdate: props.cardToUpdate
        }
        this.addMyCard = this.addMyCard.bind(this);
        this.cancel = this.cancel.bind(this);
        this.updateMyCard = this.updateMyCard.bind(this);
    }



    addMyCard() {
        const gcn = (target) => {
            return document.getElementsByClassName(target)[0].value;
        };

        const assignedCategories = gcn("categories").split(",").map((cat) => {
            var ret = cat.trim();
            if (ret.length > 0 && ret[0] !== '#') {
                ret = "#" + ret;
            }
            return ret;
        });

        if (assignedCategories.length === 1 && assignedCategories[0] === "") {
            assignedCategories.pop();
            assignedCategories.push("#untagged");
        }

        var interviewDate;
        try {
            interviewDate = new Date(this.state.interviewDate).toISOString();
        } catch(err) {
            interviewDate = "";
        }

        const card = {
            ApplicationID: uuidv4(),
            Position: gcn("position"),
            Salary: gcn("salary"),
            CompanyName: gcn("company-name"),
            CompanyPhone: gcn("company-phone"),
            CompanyAddress: gcn("company-address"),
            Categories: assignedCategories,
            Status: gcn("app-status"),
            AppliedDate: new Date(this.state.appliedDate).toISOString(),
            InterviewDate: interviewDate,
            Description: gcn("description")
        };

        console.log("NEW CARD");
        console.log(card);

        this.state.addCard(card);
    }

    componentDidMount() {
        console.log(options);
    }

    statusSelector(card=null) {
        var selected = options[0];
        console.log(card);
        if (card !== null) {
            selected = card.Status;
        }
        const opts = () => {
            return options.map((option) => {
                if (option === selected) {
                    return <option value={option} selected>{option}</option>;
                } else {
                    return <option value={option}>{option}</option>
                }
            });
        };
        return (
            <div>
                Application Status
                <select className="app-status">
                    {opts()}
                </select>
            </div>
        );
    }

    cancel() {
        this.state.cancel();
    }

    updateMyCard(){
        const gcn = (target) => {
            return document.getElementsByClassName(target)[0].value;
        };

        const assignedCategories = gcn("categories").split(",").map((cat) => {
            var ret = cat.trim();
            if (ret.length > 0 && ret[0] !== '#') {
                ret = "#" + ret;
            }
            return ret;
        });

        if (assignedCategories.length === 1 && assignedCategories[0] === "") {
            assignedCategories.pop();
            assignedCategories.push("#untagged");
        }

        var interviewDate;
        try {
            interviewDate = new Date(this.state.interviewDate).toISOString();
        } catch(err) {
            interviewDate = "";
        }

        const card = {
            ApplicationID: this.state.cardToUpdate.ApplicationID,
            Position: gcn("position"),
            Salary: gcn("salary"),
            CompanyName: gcn("company-name"),
            CompanyPhone: gcn("company-phone"),
            CompanyAddress: gcn("company-address"),
            Categories: assignedCategories,
            Status: gcn("app-status"),
            AppliedDate: new Date(this.state.appliedDate).toISOString(),
            InterviewDate: interviewDate,
            Description: gcn("description")
        };
        this.state.updateCard(card);
    }

    render() {
        if (this.state.updateCard) {
            return (
                <Modal show={true} onHide={this.cancel} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.state.cardToUpdate.CompanyName}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Label>Company Name:</Form.Label>
                            <Form.Control className="company-name" defaultValue={this.state.cardToUpdate.CompanyName} placeholder="Company Name" />

                            <Form.Label>Position</Form.Label>
                            <Form.Control className="position" defaultValue={this.state.cardToUpdate.Position} placeholder="Position" />

                            <Form.Label>Salary:</Form.Label>
                            <Form.Control className="salary" defaultValue={this.state.cardToUpdate.Salary} placeholder="Salary" />

                            <Form.Label>Company Phone:</Form.Label>
                            <Form.Control className="company-phone" defaultValue={this.state.cardToUpdate.CompanyPhone} placeholder="Company Phone" />

                            <Form.Label>Company Address:</Form.Label>
                            <Form.Control className="company-address" defaultValue={this.state.cardToUpdate.CompanyAddress} placeholder="Company Address" />

                            <Form.Label>Categories:</Form.Label>
                            <Form.Control className="categories" defaultValue={this.state.cardToUpdate.Categories} placeholder="Categories" />

                            <Form.Label>Description:</Form.Label>
                            <Form.Control className="description" defaultValue={this.state.cardToUpdate.Description} placeholder="Description" as="textarea" />

                            <Form.Group>
                                <Form.Label>Application Date:</Form.Label>
                                <DatePicker selected={Date.parse(this.state.appliedDate)} onChange={(date) => {this.setState({ appliedDate: date });}}></DatePicker>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Interview Date:</Form.Label>
                                <DatePicker selected={Date.parse(this.state.interviewDate)} showTimeSelect timeFormat="HH:mm" timeIntervals={15} dateFormat="Pp" onChange={(date) => {this.setState({ interviewDate: date });}}></DatePicker>
                            </Form.Group>
                            
                        </Form>     
                        {this.statusSelector(this.state.cardToUpdate)}
                        <button onClick={this.updateMyCard}>Update my Application</button>
                        <button onClick={this.cancel}>Cancel</button>
                    </Modal.Body>
                </Modal>
            );
        } else {
            return (
                <Modal show={true} onHide={this.cancel} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Add New Application</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Label>Company Name:</Form.Label>
                            <Form.Control className="company-name" placeholder="Company Name" />

                            <Form.Label>Position</Form.Label>
                            <Form.Control className="position" placeholder="Position" />

                            <Form.Label>Salary:</Form.Label>
                            <Form.Control className="salary" placeholder="Salary" />

                            <Form.Label>Company Phone:</Form.Label>
                            <Form.Control className="company-phone" placeholder="Company Phone" />

                            <Form.Label>Company Address:</Form.Label>
                            <Form.Control className="company-address" placeholder="Company Address" />

                            <Form.Label>Categories:</Form.Label>
                            <Form.Control className="categories" placeholder="Categories" />

                            <Form.Label>Description:</Form.Label>
                            <Form.Control className="description" placeholder="Description" as="textarea" />

                            <Form.Group>
                                <Form.Label>Application Date:</Form.Label>
                                <DatePicker selected={Date.parse(this.state.appliedDate)} onChange={(date) => {this.setState({ appliedDate: date });}}></DatePicker>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Interview Date:</Form.Label>
                                <DatePicker showTimeSelect timeFormat="HH:mm" timeIntervals={15} dateFormat="Pp" onChange={(date) => {this.setState({ interviewDate: date });}}></DatePicker>
                            </Form.Group>
                            
                        </Form>     
                        {this.statusSelector()}
                        <button onClick={this.addMyCard}>Add my Application</button>
                        <button onClick={this.cancel}>Cancel</button>
                        
                    </Modal.Body>
                </Modal>
            );
        }
    }
}

export default Popup;