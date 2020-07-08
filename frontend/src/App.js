import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import logo from './logo.svg';
import './App.css';
import dummyVals from './dummy'
import Graph from './graph'
import { Container, Row, Col, Navbar, Button, Table, ListGroup } from 'react-bootstrap'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }

  callAPI() {
    fetch("http://localhost:9000/")
      .then(res => res.text())
      .then(res => this.setState({ apiResponse: res }));
  }

  componentWillMount() {
    this.callAPI();
  }
  render() {
    return (
      <div className="App">
        <header>
          <Navbar expand="lg" variant="dark" bg="dark">
            <Navbar.Brand href="#">InternetStockPicks</Navbar.Brand>
          </Navbar>
        </header>
        <Container>
            <ListGroup>
              {dummyVals.map(entry => {
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
      </div>
    );
  }
}
export default App;

ReactDOM.render(<App />, document.getElementById('root'));


