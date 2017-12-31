import React, { Component } from 'react';
import routes from './router';
import Home from './components/Home';
import NewRecipe from './components/NewRecipe';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Home />
      </div>
    );
  }
}

export default App;
