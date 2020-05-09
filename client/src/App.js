import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from './components/Header';
import MainMenu from './components/MainMenu';
import Settings from './components/Settings';
import Game from './components/Game';
import GameMenu from './components/GameMenu';

function App() {
  return (
    <Router>
      <Header></Header>
      <Switch>
        <Route exact path="/" component={MainMenu}/>
        <Route exact path="/game" component={GameMenu}/>
        <Route exact path="/game/s" render={
          (props) => <Game {...props} type={'single'} />
        }/>
        <Route exact path="/settings" component={Settings}/>
      </Switch>
    </Router>
  );
}

export default App;
