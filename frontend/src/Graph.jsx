import React from "react";
import { Line } from "react-chartjs-2";

export default function Graph(props) {
  const data = {
    labels: ["Monday", "Tuesday", "Wednesday"],
    options: {
      legend: {
        display: false
      }
    },
    datasets: props.data.map(entry => {
      return(
        {
          label: entry["Company Name"],
          data: [entry["Mentions"], entry["Mentions"], entry["Mentions"]],
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(75, 192, 192, 0.4)",
          borderColor: '#'+Math.random().toString(16).substr(-6),
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
          pointRadius: 3,
          pointHitRadius: 30
        }
      )
    })
  };

    return (
      <>
        <Line data={data} options={data.options}/>
      </>
    );
}
