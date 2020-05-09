import React from 'react';
import MenuItem from '../Menu/MenuItem';
import Menu from '../Menu'

class MainMenu extends React.Component {

    render() {
        return(              
            <Menu>
                <MenuItem active={false} path="/game">
                    play game
                </MenuItem>
                <MenuItem active={false} path="/settings">
                    settings
                </MenuItem>
            </Menu>
        )
    }
}

export default MainMenu