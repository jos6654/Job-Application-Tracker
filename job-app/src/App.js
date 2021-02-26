import React from "react";
import logo from './logo.svg';
import './App.css';
const axios = require('axios');

function App() {
  //const [data, setData] = React.useState(null);
  const data = "";

/*
  React.useEffect(() => {
    fetch("/applications")
      .then((res) => res.json())
      .then((data) => setData(data[0].Salary));
  }, []);
*/

  // Make a request for a user with a given ID
  axios.get('/applications')
    .then(function (response) {
      // handle success
      console.log(response);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {data}
        </p>
      </header>
    </div>
  );
}

export default App;
