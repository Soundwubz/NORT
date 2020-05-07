import React from 'react';
import MenuItem from './MenuItem';
import {useHistory} from 'react-router-dom';

class GameMenu extends React.Component {

    render() {
        return(
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className="card">
                            <div className="card-body">
                                <ul className="list-group">
                                    <MenuItem active={false} path="/game" onClick={this.handleMenuClick}>
                                        play game
                                    </MenuItem>
                                    <MenuItem active={false} path="/settings" onClick={this.handleMenuClick}>
                                        settings
                                    </MenuItem>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default GameMenu