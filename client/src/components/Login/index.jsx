import React from 'react';
import {Input, FormBtn} from '../Form';

class Login extends React.Component {
    state = {
        username: "",
        password: "",
        localApiUrl: "http://localhost:3001/api/user"
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
          [name]: value
        });
    };

    handleFormSubmit = event => {
        event.preventDefault();
        if(this.state.username && this.state.password) {
            console.log(this.state.username);
        }
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h1>Login</h1>
                        <form>
                            <Input
                                value={this.state.username}
                                name="username"
                                placeholder="Username"
                                onChange={this.handleInputChange}
                            />
                            <Input
                                value={this.state.password}
                                name="password"
                                placeholder="Password"
                                type="password"
                                onChange={this.handleInputChange}
                            />
                            <FormBtn
                                disabled={!(this.state.username && this.state.password)}
                                onClick={this.handleFormSubmit}
                            >
                                Submit
                            </FormBtn>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;