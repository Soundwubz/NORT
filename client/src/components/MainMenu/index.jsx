import React from 'react';
import {Redirect} from 'react-router-dom';
import MenuItem from '../Menu/MenuItem';
import Menu from '../Menu'

class MainMenu extends React.Component {

    render() {
        if(this.props.loggedIn === true) {
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
        } else {
            return(
                <Redirect to={'/login'} />
            )
        }
        
    }
}

export default MainMenu