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
            interviewDate: new Date()
        }
        this.addMyCard = this.addMyCard.bind(this);
        this.cancel = this.cancel.bind(this);
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

    render() {
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
                            <DatePicker selected={this.state.interviewDate} onChange={(date) => {this.setState({ interviewDate: date });}}></DatePicker>
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

export default Popup;