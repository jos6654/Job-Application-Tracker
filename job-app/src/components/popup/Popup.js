import './Popup.css';
import React from 'react';

import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import {v4 as uuidv4} from 'uuid';

class Popup extends React.Component {

    constructor(props) {
        super();
        this.state = {
            addCard: props.addCard,
            cancel: props.cancel,
            interviewDate: new Date(),
            appliedDate: new Date(),
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
            if (ret[0] !== '#') {
                ret = "#" + ret;
            }
            return ret;
        });

        const card = {
            ApplicationID: uuidv4(),
            Position: gcn("position"),
            Salary: gcn("salary"),
            CompanyName: gcn("company-name"),
            CompanyPhone: gcn("company-phone"),
            CompanyAddress: gcn("company-address"),
            Categories: assignedCategories,
            AppliedDate: this.state.interviewDate.toISOString(),
            Description: gcn("description")
        };

        this.state.addCard(card);
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
            if (ret[0] !== '#') {
                ret = "#" + ret;
            }
            return ret;
        });

        const card = {
            ApplicationID: this.state.cardToUpdate.ApplicationID,
            Position: gcn("position"),
            Salary: gcn("salary"),
            CompanyName: gcn("company-name"),
            CompanyPhone: gcn("company-phone"),
            CompanyAddress: gcn("company-address"),
            Categories: assignedCategories,
            AppliedDate: this.state.interviewDate.toISOString(),
            Description: gcn("description")
        };
        this.state.updateCard(card);
    }

    render() {
        if(this.state.updateCard) {
            return (
                <div className="popup">
                    <div className="filler filler-horizontal">
                        <div className="filler-buffer"></div>
                        <div className="filler filler-vertical">
                            <div className="filler-buffer"></div>
                            <div className="popup-body">
                                <div className="popup-description">Update an application.</div>
                                <input className="company-name" type="text" defaultValue={this.state.cardToUpdate.CompanyName} placeholder="Company Name"></input>
                                <input className="position" type="text" defaultValue={this.state.cardToUpdate.Position} placeholder="Position"></input>
                                <input className="salary" type="text" defaultValue={this.state.cardToUpdate.Salary} placeholder="Salary"></input>
                                <input className="company-phone" type="text" defaultValue={this.state.cardToUpdate.CompanyPhone} placeholder="Company Phone"></input>
                                <input className="company-address" type="text" defaultValue={this.state.cardToUpdate.CompanyAddress} placeholder="Company Address"></input>
                                <input className="categories" type="text" defaultValue={this.state.cardToUpdate.Categories} placeholder="Categories"></input>
                                <input className="description" type="text" defaultValue={this.state.cardToUpdate.Description} placeholder="Description"></input>
                                <DatePicker selected={Date.parse(this.state.cardToUpdate.AppliedDate)} onChange={(date) => {this.setState({ appliedDate: date });}}></DatePicker>
                                <DatePicker selected={Date.parse(this.state.cardToUpdate.InterviewDate)} onChange={(date) => {this.setState({ appliedDate: date });}}></DatePicker>
                                <button onClick={this.updateMyCard}>Update my Application</button>
                                <button onClick={this.cancel}>Cancel</button>
                            </div>
                            <div className="filler-buffer"></div>
                        </div>
                        <div className="filler-buffer"></div>
                    </div>
                </div>
            );
        }
        else {
            return (
            <div className="popup">
                <div className="filler filler-horizontal">
                    <div className="filler-buffer"></div>
                    <div className="filler filler-vertical">
                        <div className="filler-buffer"></div>
                        <div className="popup-body">
                            <div className="popup-description">Add an application.</div>
                            <input className="company-name" type="text" placeholder="Company Name"></input>
                            <input className="position" type="text" placeholder="Position"></input>
                            <input className="salary" type="text" placeholder="Salary"></input>
                            <input className="company-phone" type="text" placeholder="Company Phone"></input>
                            <input className="company-address" type="text" placeholder="Company Address"></input>
                            <input className="categories" type="text" placeholder="Categories"></input>
                            <input className="description" type="text" placeholder="Description"></input>
                            <div>
                                Application Date
                                <DatePicker selected={Date.parse(this.state.appliedDate)} onChange={(date) => {this.setState({ appliedDate: date });}}></DatePicker>
                            </div>
                            <div>
                                Interview Date
                                <DatePicker selected={Date.parse(this.state.interviewDate)} onChange={(date) => {this.setState({ interviewDate: date });}}></DatePicker>
                            </div>
                            <button onClick={this.addMyCard}>Add my Application</button>
                            <button onClick={this.cancel}>Cancel</button>
                        </div>
                        <div className="filler-buffer"></div>
                    </div>
                    <div className="filler-buffer"></div>
                </div>
            </div>
        );
        }
    }
}

export default Popup;