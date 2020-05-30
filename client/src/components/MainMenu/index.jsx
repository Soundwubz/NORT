import React from 'react';
import {Redirect} from 'react-router-dom';
import MenuItem from '../Menu/MenuItem';
import Menu from '../Menu';
import {getFromStorage, verifyToken} from '../../utils/storage';

class MainMenu extends React.Component {

    state = {
        token: '',
        verified: false,
        navigate: false
    }

    componentDidMount() {
        // verify token and set the global token state
        try {
            const obj = getFromStorage('nort');
            if(verifyToken('/api/user/verify?token=', obj)) {
                console.log('object token:', obj.token);
                this.setState({
                    token: obj.token ? obj.token : "",
                    verified: true
                });
            } else {
                this.setState({
                    navigate: true
                });
            }
        } catch (error) {
            console.error('MainMenu err:', error);
        }
        
    }

    render() {
        if(this.state.verified === true) {
            return(              
                <Menu>
                    <MenuItem active={false} path="/game">
                        <h2>Play Game</h2>
                    </MenuItem>
                    <MenuItem active={false} path="/settings">
                        <h2>Settings</h2>
                    </MenuItem>
                </Menu>
            )
        } else if(this.state.verified === false && this.state.navigate === true) {
            return(
                <Redirect to={'/login'} />
            )
        } else {
            return (
                <h1>Loading</h1>
            )
        }  
    }
}

export default MainMenu