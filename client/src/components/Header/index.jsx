import React from "react";
import "./style.css";
import { getFromStorage, verifyToken } from "../../utils/storage";

class Header extends React.Component {

    logout = () => {
        const obj = getFromStorage('nort');
        verifyToken('/api/logout?token=', obj);
    }
    render() {
        return (
            <div className="container-fluid header">
                <div className="row">
                    <div className="col"></div>
                    <div className="col align-center">
                        <h1>N.O.R.T</h1>
                    </div>
                    <div className="col">
                        <button className="btn" onClick={this.logout}>Logout</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;