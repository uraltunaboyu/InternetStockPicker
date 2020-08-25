import React from 'react';
import { Chart } from 'react-charts'
import axios from 'axios'

export default function Graph(props) {

  let namesToGet = ["AMD", "MSFT", "TSLA", "AAPL", "AMZN", "NVDA", "TD", "LOW", "GOLD"];
  const axes = React.useMemo(
    () => [{primary: true, type:'linear', position:'bottom'},
    {type: 'linear', position:'left'}], []
  ); 
  let graphData = [];

  let backupData = [
    {
      label: 'Series 1',
      data: [[0, 1], [1, 2], [2, 4], [3, 2], [4, 7]]
    },
    {
      label: 'Series 2',
      data: [[0, 3], [1, 1], [2, 5], [3, 6], [4, 4]]
    }
  ]

  axios.post('http://localhost:9000/api/getData', {
    names: namesToGet
  })
  .then(response => {
    let result = response.data.return;
    let resultKey = response.data.returnKey;
    namesToGet.map(symbol => {
      if (resultKey.indexOf(symbol) > -1) {
        let i = 0;
        graphData.push({
          label: symbol,
          data: result[resultKey.indexOf(symbol)].map(value => {
            let indexedArrayResult = [i, value];
            i++;
            return indexedArrayResult;
          })
        })
      }
      return symbol;
    })
  }).catch(err => {
    console.error(err)
  })

  const data = React.useMemo(
    () => graphData,
    [graphData]
  )

  console.log(data);

    return(
      <div style = {{
        height: '600px',
        width: '800px'
      }}>
        <Chart data={data} axes={axes} tooltip/>
      </div>
    )
}