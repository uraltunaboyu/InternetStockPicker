import React from 'react';
import { Chart } from 'react-charts'
import dummy from './dummy.js'
import axios from 'axios'

class Graph extends React.Component {

  constructor(props) {
    super(props);
    this.state = {axes : [{primary: true, type:'time', position:'bottom'},
                          {type: 'linear', id:'Ranking', min:0, position:'left'}]};
  }

  componentDidMount() {
    axios.post('http://localhost:9000/api/getData', {
      names: ["AMD", "MSFT"]
    })
    .then(response => {
      console.log(response);
      this.setState({
        data: response.result
      })
    }).catch(err => {
      console.log(err)
    })
  }

  render() {
    return(
      <Chart data={this.state.data} axes={this.state.axes} tooltip/>
    )
  }
}

export default Graph;