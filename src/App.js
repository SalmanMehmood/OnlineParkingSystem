import React, { Component } from 'react';
import {BrowserRouter as Router , Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Signup from './components/Signup';
import Home from './components/home/home';
import Login from './components/Login'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Navigation/>
            <Route exact path="/" component={Login}/>
            <Route path="/Signup" component={Signup}/>
            <Route path="/home" component={Home}/>
          </div>    
      </Router>
      </div>
    );
  }
}

export default App;
