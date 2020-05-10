import React from 'react';
import Menu from '../Menu';
import MenuItem from '../Menu/MenuItem';

class Settings extends React.Component {
    render() {
        return (
            <Menu>
                <MenuItem active={false}>
                    player color
                </MenuItem>
                <MenuItem active={false}>
                    view controls
                </MenuItem>
                <MenuItem active={false} path={"/"}>
                    back
                </MenuItem>
            </Menu>
        )
    }
}

export default Settings;