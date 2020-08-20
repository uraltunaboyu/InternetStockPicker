import React from 'react';
import { Chart } from 'react-charts'
import dummy from './dummy.js'
import axios from 'axios'

class Graph extends React.Component {

  constructor(props) {
    super(props);
    this.state = {names: ["AMD", "MSFT", "TSLA", "AAPL", "AMZN", "NVDA", "TD", "LOW", "RK", "GOLD"],
                  axes : [{primary: true, type:'time', position:'bottom'},
                          {type: 'linear', id:'Ranking', min:0, position:'left'}],
                  graphData: []};
  }

  componentDidMount() {
    axios.post('http://localhost:9000/api/getData', {
      names: this.state.names
    })
    .then(response => {
      console.log(response);
      let names = this.state.names;
      let result = response.data.return;
      this.setState(state => {
        names.map(symbol => {
          graphData: state.graphData.push({
            label: symbol,
            data: result[result.indexOf(symbol)]
          })
        })
      })
    }).catch(err => {
      console.log(err)
    })
  }

  render() {
    return(
      <Chart data={this.state.graphData} axes={this.state.axes} tooltip/>
    )
  }
}

export default Graph;