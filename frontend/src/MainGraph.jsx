import React from "react";
import dummyVals from "./dummy";
import Graph from "./Graph.jsx";
import { Col } from "react-bootstrap";

class MainGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      graphValues : (dummyVals.length > 5) ? (dummyVals.splice(0, 5)) : dummyVals,
    }
  }

  render() {
    return (
      <>
        <Col>
          <Graph data={this.state.graphValues} />
        </Col>
      </>
    );
  }
}

export default MainGraph;
