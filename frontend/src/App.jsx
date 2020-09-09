import React from "react";
import Navbar from "./Navigation";
import Graph from './ChartsJSTest';
import GraphTest from './GraphTest';
import "bootswatch/dist/darkly/bootstrap.min.css";
import { Container, Row } from 'react-bootstrap'
import ReactTable from "./Table";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="App">
        <Navbar />
        <Container>
          <Row id="table">
            <ReactTable />
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
