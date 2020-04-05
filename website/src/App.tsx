import React from 'react';
import './App.css';
import { Sudoku } from './components/sudoku/sudoku';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { Home } from './components/home/home';


function App() {
  return (
    <Router>
      <Switch>
        <Route path="/sudoku/:sudokuId" component={Sudoku}>
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
