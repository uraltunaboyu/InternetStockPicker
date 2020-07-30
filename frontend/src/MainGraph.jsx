import React from "react";
import values from "./companyMentioned.json"
import dummy from './dummy'
import Graph from "./Graph.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Col, Card, ListGroup, Form, FormControl } from "react-bootstrap";
import Autosuggest from 'react-bootstrap-autosuggest'

class MainGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      graphValues: values.length > 5 ? values.splice(0, 5) : values,
    };
  }

  getCompanyByTicker(symbol) {
    const graphValues = this.state.graphValues;
    for (let i = 0; i < graphValues.length; i++) {
      if (graphValues[i]["Symbol"] === symbol) {
        return graphValues[i];
      }
    }
    return null;
  }

  removeFromGraph(symbol) {
    const newGraphValues = this.state.graphValues.filter(value => {
      return value["Symbol"] !== symbol
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
              <Card.Title>
              <Form inline>
                <Autosuggest datalist = {values} placeholder = "Company or Ticker" itemValuePropName = "Company Name" itemReactKeyPropName = "Symbol" itemSortKeyPropName="Current Rank"/>
              </Form></Card.Title>
              <ListGroup variant="flush">
                {this.state.graphValues.map((entry) => {
                  return (
                    <ListGroup.Item key={entry["Symbol"]}>
                      {entry["Company Name"]}
                      <FontAwesomeIcon icon={faTrash} onClick={() => this.removeFromGraph(entry["Symbol"])}/>
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
