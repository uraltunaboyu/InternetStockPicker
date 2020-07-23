import React from "react";
import dummyVals from "./dummy";
import Graph from "./Graph.jsx";
import { Col } from "react-bootstrap";

export default function MainGraph(props) {
  const graphValues = (dummyVals.length > 5) ? (dummyVals.splice(0, 5)) : dummyVals;

  return (
    <>
      <Col>
        <Graph data={dummyVals} />
      </Col>
    </>
  );
}
