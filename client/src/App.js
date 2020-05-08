import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from './components/Header';
import GameMenu from './components/GameMenu';
import Settings from './components/Settings';
import Game from './components/Game';

function App() {
  return (
    <Router>
      <Header></Header>
      <Switch>
        <Route exact path="/" component={GameMenu}/>
        <Route exact path="/game" component={Game}/>
        <Route exact path="/settings" component={Settings}/>
      </Switch>
    </Router>
  );
}

export default App;