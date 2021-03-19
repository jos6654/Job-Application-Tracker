import './Sidebar.css';
import React from 'react';

class Sidebar extends React.Component {

    constructor (props) {
        super();
        this.state = {
            checklist: props.checklist,
            selected: props.checklist,
            callback: props.callback
        };
        this.selectables = this.selectables.bind(this);
        this.updateSelected = this.updateSelected.bind(this);
        this.newUpdateSelected = this.newUpdateSelected.bind(this);
    }

    componentDidMount() {
        this.setState({
            selected: this.state.checklist.map(option => option)
        });
    }

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            this.props.checklist.forEach((option) => {
                if (!(prevProps.checklist.includes(option))) {
                    this.state.selected.push(option);
                }
            });
            this.setState({
                checklist: this.props.checklist,
                callback: this.props.callback
            });
        }
    }

    newUpdateSelected() {
        const newSelected = [];
        this.state.checklist.forEach((option) => {
            if (document.getElementById("checkbox-" + option).checked) {
                newSelected.push(option);
            }
        });
        this.state.callback(newSelected);
        this.setState({
            selected: newSelected
        });
    }

    updateSelected(option) {
        console.log("SELECTED (CURRENT, NEW):");
        console.log(this.state.selected);
        if (this.state.selected.includes(option)) {
            const idx = this.state.selected.findIndex(target => target === option);
            this.state.selected.splice(idx, 1);
        } else {
            this.state.selected.push(option);
        }
        console.log(this.state.selected);

        this.state.callback(this.state.selected);
    }

    selectables() {
        return this.state.checklist.map((option) => {
            return <div key={option}>
                <input className="checkbox" id={"checkbox-" + option} type="checkbox" name={option} onChange={this.newUpdateSelected} defaultChecked={true}></input>
                <label for={option}>{option}</label>
            </div>
        });
    }

    render() {
        return (
            <div className="checkbox-container">
                {this.selectables()}
            </div>
        );
    }

}

export default Sidebar;