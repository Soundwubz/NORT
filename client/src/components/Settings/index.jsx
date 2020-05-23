import React from 'react';
import Menu from '../Menu';
import MenuItem from '../Menu/MenuItem';
import {getFromStorage, verifyToken} from '../../utils/storage';
import { Redirect } from 'react-router-dom';

class Settings extends React.Component {

    state = {
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
        if(this.state.verified === true) {
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
        } else if (this.state.verified === false && this.state.navigate === true) {
            return (
                <Redirect to={'/login'} />
            )
        } else {
            return (
                <h1>Loading</h1>
            )
        }
    }
}

export default Settings;