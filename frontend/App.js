import React from 'react';
import 'style.css';
import nasdaqVals from '../data/nasdaq.json'
import Chart from './chart.js'
export default function App() {
    return(
        <div className="app">
            <h1 id="title">Test</h1>
                <ul>
                    {nasdaqVals.map(entry => {
                        <li key = {entry.Symbol}>
                            <Chart title={entry["Security Name"]} values={Array.from({length: 21}, () => Math.floor(Math.random() * 200 + 100))}/>
                        </li>
                    })}
                </ul>
        </div>
    )
}