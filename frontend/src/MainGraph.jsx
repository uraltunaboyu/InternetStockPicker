import React from 'react';
import './MainGraph.css';
import dummyVals from './dummy'
import Graph from './Graph.jsx'
import { Container, Col, ListGroup } from 'react-bootstrap'

class MainGraph extends React.Component {
  constructor(props) {
    super(props);
    //this.state = { apiResponse: "" };
  }
  /*
  callAPI() {
    fetch("http://localhost:9000/")
      .then(res => res.text())
      .then(res => this.setState({ apiResponse: res }));
  }

  componentWillMount() {
    this.callAPI();
  } */
  render() {
    return (
      <div className="MainGraph">
        <Container>
            <ListGroup>
              {dummyVals.map(entry => {
                return (
                  <Col>
                    <ListGroup.Item key={entry.ticker}>
                      <Graph title={entry.name} values={entry.values} />
                    </ListGroup.Item>
                  </Col>
                );
              })}
            </ListGroup>
        </Container>
      </div>
    );
  }
}
export default MainGraph;


