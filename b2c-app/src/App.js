import React from 'react';
//import './App.scss';
import Signup from './pages/Signup';

import {
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <div className="App" id="app">
      <div id="routes">
        <Switch>
          <Route exact path="/">
            <header className="App-header">
              <img src="/b2c/images/logo.svg" className="App-logo" alt="logo" />
              <p>
                Edit <code>src/App.js</code> and save to reloadssss.
                </p>
              <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn React
                </a>
            </header>
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
