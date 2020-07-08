import React from "react";
import MainGraph from "./MainGraph";
import Navigation from "./Navigation";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div class="App">
        <Navigation />
        <MainGraph />
      </div>
    );
  }
}

export default App;
