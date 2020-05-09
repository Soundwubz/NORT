import React from 'react';
import Menu from '../Menu';
import MenuInput from '../Menu/MenuItem';

class GameMenu extends React.Component {
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