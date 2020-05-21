import React from 'react';
import logo from './logo.svg';
import axios from 'axios';
import Home from './components/Home/Home'
import './App.css';


class App extends React.Component {

  render() {
    return (
      <div>
        <Home />        
      </div>
    );
  }
}

export default App;
