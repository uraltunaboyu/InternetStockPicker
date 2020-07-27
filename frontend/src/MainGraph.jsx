import React from "react";
import dummyVals from "./dummy";
import Graph from "./Graph.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Col, Card, ListGroup } from "react-bootstrap";

class MainGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      graphValues: dummyVals.length > 5 ? dummyVals.splice(0, 5) : dummyVals,
    };
  }

  getCompanyByTicker(ticker) {
    const graphValues = this.state.graphValues;
    for (let i = 0; i < graphValues.length; i++) {
      if (graphValues[i].ticker === ticker) {
        return graphValues[i];
      }
    }
    return null;
  }

  removeFromGraph(ticker) {
    const newGraphValues = this.state.graphValues.filter(value => {
      return value.ticker != ticker
    })
    this.setState({
      graphValues: newGraphValues
    })
  }

  render() {
    return (
      <>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Search:</Card.Title>
              <ListGroup variant="flush">
                {this.state.graphValues.map((entry) => {
                  return (
                    <ListGroup.Item key={entry.ticker}>
                      {entry.name}
                      <FontAwesomeIcon icon={faTrash} onClick={() => this.removeFromGraph(entry.ticker)}/>
                    </ListGroup.Item>
                  );
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
