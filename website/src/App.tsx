import React from 'react';
import './App.css';
import { SudokuComponent } from './components/sudoku/sudoku';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { Home } from './components/home/home';


function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route path="/sudoku/:sudokuId" component={SudokuComponent}>
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
