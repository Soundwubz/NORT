import React from 'react';
import Menu from '../Menu';
import MenuInput from '../Menu/MenuItem';
import {getFromStorage, verifyToken} from '../../utils/storage';

class GameMenu extends React.Component {

    state = {
        token: ''
    }

    componentDidMount() {
        // verify token and set the global token state
        const obj = getFromStorage('nort');
        if(verifyToken('/api/user/verify?token=', obj)) {
            this.setState({
                token: obj.token
            })
        }
    }

    render() {
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
    }
}

export default GameMenu;