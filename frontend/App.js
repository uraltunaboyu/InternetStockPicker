import React from 'react';
import 'style.css';
import nasdaqVals from '../data/nasdaq.json'
import Chart from './chart.js'
export default function App() {
    return(
        <div className="App">
            <h1 id="title">
                <ul>
                    {nasdaqVals.map(entry => {
                        <li key = {entry.Symbol}>
                            <Chart title={entry["Security Name"]} values={Array.from({length: 40}, () => Math.floor(Math.random() * 40))}/>
                        </li>
                    })}
                </ul>
            </h1>
        </div>
    )
}