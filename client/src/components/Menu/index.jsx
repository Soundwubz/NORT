import React from 'react';
import './style.css';

class Menu extends React.Component {
    render(){
        return(
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className="card">
                            <div className="card-body">
                                <ul className="list-group">
                                    {this.props.children}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Menu;