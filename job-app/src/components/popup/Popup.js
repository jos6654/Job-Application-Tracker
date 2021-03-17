import './Popup.css';
import React from 'react';

import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import {v4 as uuidv4} from 'uuid';

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
        this.popup = this.popup.bind(this);
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
            Status: gcn("app-status"),
            AppliedDate: this.state.appliedDate.toISOString(),
            InterviewDate: this.state.interviewDate.toISOString(),
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
        console.log("SELECTED:");
        console.log(selected);
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
            if (ret[0] !== '#') {
                ret = "#" + ret;
            }
            return ret;
        });

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

    popup() {
        if (this.state.updateCard) {
            return (
                <div className="popup-body">
                    <div className="popup-description">Update an application.</div>
                    <input className="company-name" type="text" defaultValue={this.state.cardToUpdate.CompanyName} placeholder="Company Name"></input>
                    <input className="position" type="text" defaultValue={this.state.cardToUpdate.Position} placeholder="Position"></input>
                    <input className="salary" type="text" defaultValue={this.state.cardToUpdate.Salary} placeholder="Salary"></input>
                    <input className="company-phone" type="text" defaultValue={this.state.cardToUpdate.CompanyPhone} placeholder="Company Phone"></input>
                    <input className="company-address" type="text" defaultValue={this.state.cardToUpdate.CompanyAddress} placeholder="Company Address"></input>
                    <input className="categories" type="text" defaultValue={this.state.cardToUpdate.Categories} placeholder="Categories"></input>
                    <input className="description" type="text" defaultValue={this.state.cardToUpdate.Description} placeholder="Description"></input>
                    {this.statusSelector(this.state.cardToUpdate)}
                    <div>
                        Application Date
                        <DatePicker selected={Date.parse(this.state.appliedDate)} onChange={(date) => {this.setState({ appliedDate: date });}}></DatePicker>
                    </div>
                    <div>
                        Interview Date
                        <DatePicker selected={Date.parse(this.state.interviewDate)} showTimeSelect timeFormat="HH:mm" timeIntervals={15} dateFormat="Pp" onChange={(date) => {this.setState({ interviewDate: date });}}></DatePicker>
                    </div>
                    <button onClick={this.updateMyCard}>Update my Application</button>
                    <button onClick={this.cancel}>Cancel</button>
                </div>
            );
        } else {
            return (
                <div className="popup-body">
                    <div className="popup-description">Add an application.</div>
                    <input className="company-name" type="text" placeholder="Company Name"></input>
                    <input className="position" type="text" placeholder="Position"></input>
                    <input className="salary" type="text" placeholder="Salary"></input>
                    <input className="company-phone" type="text" placeholder="Company Phone"></input>
                    <input className="company-address" type="text" placeholder="Company Address"></input>
                    <input className="categories" type="text" placeholder="Categories"></input>
                    <input className="description" type="text" placeholder="Description"></input>
                    {this.statusSelector()}
                    <div>
                        Application Date
                        <DatePicker selected={Date.parse(this.state.appliedDate)} onChange={(date) => {this.setState({ appliedDate: date });}}></DatePicker>
                    </div>
                    <div>
                        Interview Date
                        <DatePicker showTimeSelect timeFormat="HH:mm" timeIntervals={15} dateFormat="Pp" onChange={(date) => {this.setState({ interviewDate: date });}}></DatePicker>
                    </div>
                    <button onClick={this.addMyCard}>Add my Application</button>
                    <button onClick={this.cancel}>Cancel</button>
                </div>
            );
        }
    }

    render() {
        return (
            <div className="popup">
                <div className="flex-vertical">
                    <div className="filler-vertical"></div>
                    <div className="flex-horizontal">
                        <div className="filler-horizontal"></div>
                        {this.popup()}
                        <div className="filler-horizontal"></div>
                    </div>
                    <div className="filler-vertical"></div>
                </div>
            </div>
        );
    }
}

export default Popup;