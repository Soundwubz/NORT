import React from "react";
import "./style.css";
import { getFromStorage, verifyToken } from "../../utils/storage";
import { Redirect } from "react-router-dom";

class Header extends React.Component {

    state = {
        navigate: false
    }

    logout = () => {
        const obj = getFromStorage('nort');
        const loggedOut = verifyToken('/api/logout?token=', obj);
        if(loggedOut) {
            // add call to delete old session here
            this.setState({navigate: true});
        }
    }
    render() {
        if(this.state.navigate === true) {
            this.setState({navigate: false});
            return (
                <Redirect to={'/login'} />
            )
        } else {
            return (
                <div className="container-fluid header">
                    <div className="row">
                        <div className="col"></div>
                        <div className="col">
                            <h1>N.O.R.T</h1>
                        </div>
                        <div className="col text-center align-middle">
                            <button className="btn logout" onClick={this.logout}>Logout</button>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default Header;