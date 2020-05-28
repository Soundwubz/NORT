import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from './components/Header';
import MainMenu from './components/MainMenu';
import Settings from './components/Settings';
import Game from './components/Game';
import GameMenu from './components/GameMenu';
import Login from './components/Login';
import Signup from './components/Signup';

class App extends React.Component {

  render() {
    return (
      <Router>
        <Header></Header>
        <Switch>
          <Route exact path="/" component={MainMenu}/>
          }/>
          <Route exact path="/game" component={GameMenu}/>
          <Route exact path="/game/s" render={
            (props) => <Game {...props} type={'single'} difficulty={'test'} />
          }/>
          <Route exact path="/settings" component={Settings}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/signup" component={Signup}/>
        </Switch>
      </Router>
    )
  }
}

export default App;
