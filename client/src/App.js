import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from './components/Header';
import MainMenu from './components/MainMenu';
import Settings from './components/Settings';
import Game from './components/Game';
import GameMenu from './components/GameMenu';
import Login from './components/Login';
import Signup from './components/Signup';
import axios from 'axios';

class App extends React.Component {

  constructor() {
    super()
    this.state = {
      loggedIn: false,
      username: null,
      userApi: 'http://localhost:3001/api/user'
    }

    this.getUser = this.getUser.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.updateUser = this.updateUser.bind(this)
  }

  componentDidMount() {
    this.getUser()
  }

  updateUser (userObject) {
    this.setState(userObject)
  }

  getUser() {
    axios.get(this.state.userApi).then(response => {
      console.log('Get user response: ')
      console.log(response.data)
      if (response.data.user) {
        console.log('Get User: There is a user saved in the server session: ')

        this.setState({
          loggedIn: true,
          username: response.data.user.username
        })
      } else {
        console.log('Get user: no user');
        this.setState({
          loggedIn: false,
          username: null
        })
      }
    })
  }

  render() {
    return (
      <Router>
        <Header></Header>
        <Switch>
          <Route exact path="/" render={
            (props) => <MainMenu {...props} 
            loggedIn={this.state.loggedIn} 
            />
          }/>
          <Route exact path="/game" component={GameMenu}/>
          <Route exact path="/game/s" render={
            (props) => <Game {...props} type={'single'} />
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
