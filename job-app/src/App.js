
import './App.css';
import React from 'react';
import { Card, Button, Container } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {

    constructor() {
        super();
        this.state = {
            data: null
        };
    }

    componentDidMount() {
        console.log("App.js mounted");
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1>Job Application Dashboard</h1>
                </header>
                <div className="App-body">
                    <Container className="main">
                        <div className="untagged">
                            <h3>Untagged</h3>
                            {/* placeholder */}
                            <Card>
                                <Card.Body>
                                    <Card.Title>NYTimes</Card.Title>
                                </Card.Body>
                            </Card>

                            {/* placeholder */}
                            <Card>
                                <Card.Body>
                                    <Card.Title>GameStop</Card.Title>
                                </Card.Body>
                            </Card>
                        </div>
                        {/* <div className="newCol">
                            <h3>Preferred</h3>
                            <Card>
                                <Card.Body>
                                    <Card.Title>Datto</Card.Title>
                                </Card.Body>
                            </Card>
                        </div> */}
                    </Container>
                    <div className="options">
                        <Button variant="primary" className="btn-primary">+ New Application</Button> {' '}
                        <h2>Tags</h2>
                        <div>
                            <p>#preferred</p> {/* placeholder */}
                            <p>#backups</p>   {/* placeholder */}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
