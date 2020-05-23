import React from 'react';
import {Redirect} from 'react-router-dom';
import Menu from '../Menu';
import MenuInput from '../Menu/MenuItem';
import {getFromStorage, verifyToken} from '../../utils/storage';

class GameMenu extends React.Component {

    state = {
        token: '',
        verified: false,
        navigate: false
    }

    componentDidMount() {
        // verify token and set the global token state
        const obj = getFromStorage('nort');
        if(verifyToken('/api/user/verify?token=', obj)) {
            this.setState({
                token: obj.token,
                verified: true
            });
        } else {
            this.setState({
                navigate: true
            });
        }
    }

    render() {
        if(this.state.verified === true){
            return(
                <Menu>
                    <MenuInput active={true} path="/game/s">
                        Singleplayer
                    </MenuInput>
                    <MenuInput active={false} path="/">
                        Back
                    </MenuInput>
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

export default GameMenu;