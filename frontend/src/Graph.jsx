import React from "react";
import { Line } from "react-chartjs-2";

class Graph extends React.Component {
  initialState = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: this.props.title,
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75, 192, 192, 0.4)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75, 192, 192, 1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75, 192, 192, 1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: this.props.values
      }
    ]
  };

  constructor(props){
      super(props);
      this.state = {
          data: this.initialState
      };
  }

  render() {
    return (
      <div>
        <h2>{this.props.graphTitle}</h2>
        <Line data={this.state.data} />
      </div>
    );
  }
}

export default Graph;
