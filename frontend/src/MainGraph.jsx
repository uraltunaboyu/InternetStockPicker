import React from "react";
import "./MainGraph.css";
import dummyVals from "./dummy";
import Graph from "./Graph.jsx";
import { Container, Col, ListGroup } from "react-bootstrap";
import Navbar from "./Navigation";

export default function MainGraph(props) {
  return (
    <>
      <Navbar />
      <Container>
        <ListGroup>
          {dummyVals.map((entry) => {
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
    </>
  );
}
