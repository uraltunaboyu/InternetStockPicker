import React from "react";
import MainGraph from "./MainGraph";
import Navbar from "./Navigation";
import TableDraft from "./TableDraft";
import "bootswatch/dist/darkly/bootstrap.min.css";
import { Container, Row } from 'react-bootstrap'

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
          <Row>
            <MainGraph />
          </Row>
          <Row>
            <TableDraft />
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
