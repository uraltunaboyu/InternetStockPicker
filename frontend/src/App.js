import React from 'react';
import logo from './logo.svg';
import './App.css';
import dummyVals from './dummy'
import Graph from './graph'

function App() {
  return (
    <div className="App">
      <ul>
        {dummyVals.map(entry => {
          return(
            <li key = {entry.ticker}>
              <Graph title = {entry.name} values = {entry.values} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
