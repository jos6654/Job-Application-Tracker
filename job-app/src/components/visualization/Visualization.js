//import './Visualization.css';
import React from 'react';
import { Modal, Form } from 'react-bootstrap';

class Visualization extends React.Component {

    constructor(props) {
        super();
        this.state = {
            close: props.close,
            dadta: props.data
        };
        this.close = this.close.bind(this);
    }

    close() {
        this.state.close();
    }

    render(){
        return(
            <Modal show={true} onHide={this.close} centered>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Copy and paste this text into http://sankeymatic.com/build/ to visualize your job search!</Form.Label>
                        <Form.Control defaultValue={this.state.data} as="textarea" rows={6} />
                    </Form.Group>
                    </Form>
                </Modal.Body>
            </Modal>
        );
    }
}

export default Visualization;