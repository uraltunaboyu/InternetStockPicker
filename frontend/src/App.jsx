import React from "react";
import MainGraph from "./MainGraph";
import Navbar from "./Navigation";
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

          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
