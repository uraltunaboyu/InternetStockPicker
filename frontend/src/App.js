import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import dummyVals from './dummy'
import Graph from './graph'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }

  callAPI() {
    fetch("http://localhost:9000/")
      .then(res => res.text())
      .then(res => this.setState({ apiResponse: res }));
  }

  componentWillMount() {
    this.callAPI();
  }
  render() {
    return (
      <div className="App">
        <ul>
          {dummyVals.map(entry => {
            return (
              <li key={entry.ticker}>
                <Graph title={entry.name} values={entry.values} />
              </li>
            );
          })}
        </ul>
        <p className="App-intro">;{this.state.apiResponse}</p>
      </div>
    );
  }
}

export default App;
