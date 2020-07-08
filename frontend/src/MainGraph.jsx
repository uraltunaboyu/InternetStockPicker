import React from "react";
import dummyVals from "./dummy";
import Graph from "./Graph.jsx";
import { Col } from "react-bootstrap";

export default function MainGraph(props) {
  return (
    <Col>
      <Graph data={dummyVals} />
    </Col>
  );
}
