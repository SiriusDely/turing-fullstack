import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Dog from './Dog'

class App extends Component {
  render() {
    fetch('/api').then(resp => {
      console.log(resp.json());
    })
    return (
      <div className="App">
        <Dog />
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
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
      </div>
    );
  }
}

export default App;
