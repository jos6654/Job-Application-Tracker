
import './App.css';
import { Card, Button, Container } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
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

// takes in the card that the user is editing, and will diplay the card
// with editable fields. After the user presses "save", this function will
// update the card object and return it.
function UpdateInfo(card) {
    
    return card;
}

export default App;
