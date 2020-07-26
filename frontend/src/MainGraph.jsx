import React from "react";
import dummyVals from "./dummy";
import Graph from "./Graph.jsx";
import { Col, Card, ListGroup } from "react-bootstrap";

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
          <Card>
            <Card.Body>
              <Card.Title>
                Search:
              </Card.Title>
              <ListGroup variant="flush">
                {this.state.graphValues.map(entry => {
                  return(<ListGroup.Item>{entry.name}
                  <i class="fas fa-trash"></i></ListGroup.Item>);
                })}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={8}>
          <Graph data={this.state.graphValues} />
        </Col>
      </>
    );
  }
}

export default MainGraph;
