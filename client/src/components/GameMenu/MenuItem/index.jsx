import React from 'react';
import { Redirect } from 'react-router-dom';

class MenuItem extends React.Component {

    state = {
        navigate: false,
        path: this.props.path
    }

    handleClick = () => {
        this.setState({
            navigate: true
        })
    }

    render() {
        if (this.state.navigate === true) {
            return <Redirect to={this.state.path} />
        }
        return(
            <li className="list-group-item text-center" onClick={this.handleClick}>
                {this.props.active ? '>' + this.props.children : this.props.children}
            </li>
        )
    }
}

export default MenuItem;